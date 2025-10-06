<?php
require_once 'auth.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = getRequestBody();

    if (!isset($input['email'])) {
        sendResponse(false, null, 'Email is required', 400);
    }

    $email = $input['email'];
    $pdo = getDBConnection();

    // Check if user exists
    $stmt = $pdo->prepare("SELECT id, username FROM users WHERE username = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user) {
        // For security, do not reveal if user does not exist
        sendResponse(true, null, 'If the email exists, a reset link will be sent');
    }

    // Generate password reset token and expiry (1 hour)
    $token = bin2hex(random_bytes(16));
    $expires = date('Y-m-d H:i:s', time() + 3600);

    // Store token and expiry in password_resets table
    $stmt = $pdo->prepare("INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE token = VALUES(token), expires_at = VALUES(expires_at)");
    $stmt->execute([$user['id'], $token, $expires]);

    // TODO: Send email with reset link containing token
    // Example reset link: https://yourdomain.com/reset_password.php?token=$token

    sendResponse(true, null, 'If the email exists, a reset link will be sent');
} else {
    sendResponse(false, null, 'Method not allowed', 405);
}
?>
