<?php
require_once 'config.php';

// Simple JWT implementation
class JWT {
    public static function encode($payload, $key, $alg = 'HS256') {
        $header = json_encode(['typ' => 'JWT', 'alg' => $alg]);
        $header_encoded = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

        $payload_encoded = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(json_encode($payload)));

        $signature = hash_hmac('sha256', $header_encoded . "." . $payload_encoded, $key, true);
        $signature_encoded = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $header_encoded . "." . $payload_encoded . "." . $signature_encoded;
    }

    public static function decode($jwt, $key) {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            return false;
        }

        $header = $parts[0];
        $payload = $parts[1];
        $signature = $parts[2];

        $expected_signature = hash_hmac('sha256', $header . "." . $payload, $key, true);
        $expected_signature_encoded = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($expected_signature));

        if ($signature !== $expected_signature_encoded) {
            return false;
        }

        $payload_decoded = json_decode(base64_decode(str_replace(['-', '_'], ['+', '/'], $payload)), true);

        if ($payload_decoded['exp'] < time()) {
            return false;
        }

        return $payload_decoded;
    }
}

// Authentication functions
function authenticateUser($username, $password) {
    $pdo = getDBConnection();

    $stmt = $pdo->prepare("SELECT id, username, password_hash, role FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        return false;
    }

    return $user;
}

function createUser($username, $password, $role = 'user') {
    $pdo = getDBConnection();

    // Check if username already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
    $stmt->execute([$username]);
    if ($stmt->fetch()) {
        return false;
    }

    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $pdo->prepare("INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)");
    $stmt->execute([$username, $password_hash, $role]);

    return $pdo->lastInsertId();
}

function generateToken($user) {
    $payload = [
        'iss' => 'vista-magazijn-api',
        'sub' => $user['id'],
        'username' => $user['username'],
        'role' => $user['role'],
        'iat' => time(),
        'exp' => time() + (24 * 60 * 60) // 24 hours
    ];

    return JWT::encode($payload, JWT_SECRET);
}

function validateToken() {
    $headers = getallheaders();
    $auth_header = isset($headers['Authorization']) ? $headers['Authorization'] : '';

    if (empty($auth_header) || !preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
        return false;
    }

    $token = $matches[1];
    $payload = JWT::decode($token, JWT_SECRET);

    if (!$payload) {
        return false;
    }

    return $payload;
}

function requireAuth() {
    $user = validateToken();
    if (!$user) {
        sendResponse(false, null, 'Unauthorized', 401);
    }
    return $user;
}

function requireAdmin() {
    $user = requireAuth();
    if ($user['role'] !== 'admin') {
        sendResponse(false, null, 'Admin access required', 403);
    }
    return $user;
}
