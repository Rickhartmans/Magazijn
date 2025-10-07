<?php
require_once 'auth.php';

$user = requireAuth();

// Only admins can manage users
if ($user['role'] !== 'admin') {
    sendResponse(false, null, 'Admin access required', 403);
}

$pdo = getDBConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Get all users
        $stmt = $pdo->query("SELECT id, username, role, created_at FROM users ORDER BY created_at DESC");
        $users = $stmt->fetchAll();
        sendResponse(true, $users);
        break;

    case 'POST':
        // Create new user
        $input = getRequestBody();
        if (!isset($input['username']) || !isset($input['password'])) {
            sendResponse(false, null, 'Username and password are required', 400);
        }

        $role = $input['role'] ?? 'user';
        $userId = createUser($input['username'], $input['password'], $role);

        if (!$userId) {
            sendResponse(false, null, 'Username already exists', 409);
        }

        sendResponse(true, ['id' => $userId], 'User created successfully');
        break;

    case 'PUT':
        // Update user role
        $input = getRequestBody();
        if (!isset($input['id']) || !isset($input['role'])) {
            sendResponse(false, null, 'User ID and role are required', 400);
        }

        // Prevent changing own role
        if ($input['id'] == $user['id']) {
            sendResponse(false, null, 'Cannot change your own role', 403);
        }

        $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
        $stmt->execute([$input['role'], $input['id']]);
        sendResponse(true, null, 'User role updated successfully');
        break;

    case 'DELETE':
        // Delete user
        $input = getRequestBody();
        if (!isset($input['id'])) {
            sendResponse(false, null, 'User ID is required', 400);
        }

        // Prevent deleting own account
        if ($input['id'] == $user['id']) {
            sendResponse(false, null, 'Cannot delete your own account', 403);
        }

        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$input['id']]);
        sendResponse(true, null, 'User deleted successfully');
        break;

    default:
        sendResponse(false, null, 'Method not allowed', 405);
}