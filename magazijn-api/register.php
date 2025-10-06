<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once 'auth.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, null, 'Method not allowed', 405);
}

$input = getRequestBody();

if (!isset($input['username']) || !isset($input['password']) || !isset($input['confirmPassword'])) {
    sendResponse(false, null, 'Username, password, and confirm password are required', 400);
}

if ($input['password'] !== $input['confirmPassword']) {
    sendResponse(false, null, 'Passwords do not match', 400);
}

// Force role to 'user' to prevent unauthorized admin signups
$role = 'user';

$userId = createUser($input['username'], $input['password'], $role);

if (!$userId) {
    sendResponse(false, null, 'Username already exists', 409);
}

$user = [
    'id' => $userId,
    'username' => $input['username'],
    'role' => $role
];

$token = generateToken($user);

sendResponse(true, [
    'token' => $token,
    'user' => $user
], 'Registration successful');
