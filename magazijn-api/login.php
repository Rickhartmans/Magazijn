<?php
require_once 'auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, null, 'Method not allowed', 405);
}

$input = getRequestBody();

if (!isset($input['username']) || !isset($input['password'])) {
    sendResponse(false, null, 'Username and password are required', 400);
}

$user = authenticateUser($input['username'], $input['password']);

if (!$user) {
    sendResponse(false, null, 'Invalid credentials', 401);
}

$token = generateToken($user);

sendResponse(true, [
    'token' => $token,
    'user' => [
        'id' => $user['id'],
        'username' => $user['username'],
        'role' => $user['role']
    ]
], 'Login successful');
?>
