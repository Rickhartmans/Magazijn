<?php
require_once 'config.php';

// Temporary test login endpoint for local testing only
// Accept JSON body or form-encoded parameters for robustness
$input = getRequestBody();
$username = $input['username'] ?? null;
$password = $input['password'] ?? null;

// Fallback to form data / query params if JSON body empty
if (!$username || !$password) {
    $username = $_POST['username'] ?? $_GET['username'] ?? $username;
    $password = $_POST['password'] ?? $_GET['password'] ?? $password;
}

if (!$username || !$password) {
    sendResponse(false, null, 'Username and password are required', 400);
}

// Create a fake token and user for testing
$token = base64_encode($username . ':test-token');
$user = [
    'id' => 1,
    'username' => $username,
    'role' => 'admin'
];

sendResponse(true, ['token' => $token, 'user' => $user], 'Test login successful');
