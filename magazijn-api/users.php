<?php
require_once 'auth.php';

$user = requireAuth();
requireAdmin();

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Get all users with optional search
        $pdo = getDBConnection();
        $search = isset($_GET['search']) ? $_GET['search'] : '';
        if ($search) {
            $stmt = $pdo->prepare("SELECT id, username, role FROM users WHERE username LIKE ? ORDER BY id");
            $stmt->execute(['%' . $search . '%']);
        } else {
            $stmt = $pdo->query("SELECT id, username, role FROM users ORDER BY id");
        }
        $users = $stmt->fetchAll();
        sendResponse(true, $users);
        break;

    case 'PUT':
        // Update user role
        $input = getRequestBody();
        if (!isset($input['id']) || !isset($input['role'])) {
            sendResponse(false, null, 'User ID and role are required', 400);
        }

        $pdo = getDBConnection();
        $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE id = ?");
        $stmt->execute([$input['role'], $input['id']]);

        if ($stmt->rowCount() > 0) {
            sendResponse(true, null, 'User role updated successfully');
        } else {
            sendResponse(false, null, 'User not found', 404);
        }
        break;

    case 'DELETE':
        // Delete user
        $input = getRequestBody();
        if (!isset($input['id'])) {
            sendResponse(false, null, 'User ID is required', 400);
        }

        $pdo = getDBConnection();
        $stmt = $pdo->prepare("DELETE FROM users WHERE id = ?");
        $stmt->execute([$input['id']]);

        if ($stmt->rowCount() > 0) {
            sendResponse(true, null, 'User deleted successfully');
        } else {
            sendResponse(false, null, 'User not found', 404);
        }
        break;

    default:
        sendResponse(false, null, 'Method not allowed', 405);
}
?>
