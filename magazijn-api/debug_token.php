<?php
// Temporary debug endpoint - DO NOT LEAVE IN PRODUCTION
require_once 'auth.php';

// Allow token via Authorization header or ?token=
$token = null;
$headers = [];
if (function_exists('getallheaders')) {
    $headers = getallheaders();
}

if (!empty($headers['Authorization'])) {
    if (preg_match('/Bearer\s+(.*)$/i', $headers['Authorization'], $m)) {
        $token = $m[1];
    }
} elseif (!empty($headers['authorization'])) {
    if (preg_match('/Bearer\s+(.*)$/i', $headers['authorization'], $m)) {
        $token = $m[1];
    }
}

if (empty($token) && !empty($_SERVER['HTTP_AUTHORIZATION'])) {
    if (preg_match('/Bearer\s+(.*)$/i', $_SERVER['HTTP_AUTHORIZATION'], $m)) {
        $token = $m[1];
    }
}

if (empty($token) && !empty($_GET['token'])) {
    $token = $_GET['token'];
}

if (empty($token)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No token provided']);
    exit;
}

$payload = JWT::decode($token, JWT_SECRET);
if (!$payload) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Invalid or expired token']);
    exit;
}

// Return the decoded payload for debugging
echo json_encode(['success' => true, 'payload' => $payload]);
