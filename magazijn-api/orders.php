<?php
require_once 'auth.php';

$user = requireAuth();

$pdo = getDBConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $query = "SELECT * FROM orders WHERE 1=1";
        $params = [];

        if ($user['role'] !== 'admin') {
            $query .= " AND naam = ?";
            $params[] = $user['username'];
        }

        // Search functionality
        if (isset($_GET['search'])) {
            $search = '%' . $_GET['search'] . '%';
            $query .= " AND (artikel LIKE ? OR leerlingnr LIKE ? OR naam LIKE ? OR opmerkingen LIKE ?)";
            $params = array_merge($params, [$search, $search, $search, $search]);
        }

        // Filter by status
        if (isset($_GET['status'])) {
            $query .= " AND status = ?";
            $params[] = $_GET['status'];
        }

        $query .= " ORDER BY created_at DESC";

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $orders = $stmt->fetchAll();
        sendResponse(true, $orders);
        break;

    case 'POST':
        $input = getRequestBody();
        if (!isset($input['leerlingnr']) || !isset($input['artikel']) || !isset($input['datum'])) {
            sendResponse(false, null, 'Student number, article, and date are required', 400);
        }
        $stmt = $pdo->prepare("INSERT INTO orders (leerlingnr, naam, artikel, status, datum, opmerkingen) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['leerlingnr'],
            $user['username'], // Set naam to current user's username
            $input['artikel'],
            $input['status'] ?? 'pending',
            $input['datum'],
            $input['opmerkingen'] ?? null
        ]);
        sendResponse(true, ['id' => $pdo->lastInsertId()], 'Order added successfully');
        break;

    case 'PUT':
        $input = getRequestBody();
        if (!isset($input['id'])) {
            sendResponse(false, null, 'ID is required', 400);
        }

        // Fetch existing order to check ownership and role
        $stmt = $pdo->prepare("SELECT * FROM orders WHERE id = ?");
        $stmt->execute([$input['id']]);
        $order = $stmt->fetch();

        if (!$order) {
            sendResponse(false, null, 'Order not found', 404);
        }

        // If user is not admin, ensure they own the order
        if ($user['role'] !== 'admin' && $order['naam'] !== $user['username']) {
            sendResponse(false, null, 'Unauthorized to update this order', 403);
        }

        // For non-admins, restrict fields they can update (e.g., no status change)
        if ($user['role'] !== 'admin') {
            $input['status'] = $order['status']; // preserve existing status
            $input['leerlingnr'] = $order['leerlingnr']; // preserve existing leerlingnr
            $input['naam'] = $order['naam']; // preserve existing naam
        }

        $stmt = $pdo->prepare("UPDATE orders SET leerlingnr = ?, naam = ?, artikel = ?, status = ?, datum = ?, opmerkingen = ? WHERE id = ?");
        $stmt->execute([
            $input['leerlingnr'],
            $input['naam'],
            $input['artikel'],
            $input['status'],
            $input['datum'],
            $input['opmerkingen'] ?? null,
            $input['id']
        ]);
        sendResponse(true, null, 'Order updated successfully');
        break;

    case 'DELETE':
        if ($user['role'] !== 'admin') {
            sendResponse(false, null, 'Admin access required', 403);
        }
        $input = getRequestBody();
        if (!isset($input['id'])) {
            sendResponse(false, null, 'ID is required', 400);
        }
        $stmt = $pdo->prepare("DELETE FROM orders WHERE id = ?");
        $stmt->execute([$input['id']]);
        sendResponse(true, null, 'Order deleted successfully');
        break;

    default:
        sendResponse(false, null, 'Method not allowed', 405);
}
?>
