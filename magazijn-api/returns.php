<?php
require_once 'auth.php';

$user = requireAuth();

$pdo = getDBConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $query = "SELECT * FROM returns WHERE 1=1";
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

        // Filter by condition
        if (isset($_GET['conditie'])) {
            $query .= " AND conditie = ?";
            $params[] = $_GET['conditie'];
        }

        $query .= " ORDER BY created_at DESC";

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $returns = $stmt->fetchAll();
        sendResponse(true, $returns);
        break;

    case 'POST':
        $input = getRequestBody();
        if (!isset($input['artikel']) || !isset($input['inleverdatum'])) {
            sendResponse(false, null, 'Article and return date are required', 400);
        }
        $stmt = $pdo->prepare("INSERT INTO returns (artikel, leerlingnr, naam, inleverdatum, conditie, opmerkingen) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['artikel'],
            $user['username'], // Set leerlingnr and naam to current user
            $user['username'],
            $input['inleverdatum'],
            $input['conditie'] ?? 'goed',
            $input['opmerkingen'] ?? null
        ]);
        sendResponse(true, ['id' => $pdo->lastInsertId()], 'Return added successfully');
        break;

    case 'PUT':
        $input = getRequestBody();
        if (!isset($input['id'])) {
            sendResponse(false, null, 'ID is required', 400);
        }

        // Fetch existing return to check ownership and role
        $stmt = $pdo->prepare("SELECT * FROM returns WHERE id = ?");
        $stmt->execute([$input['id']]);
        $return = $stmt->fetch();

        if (!$return) {
            sendResponse(false, null, 'Return not found', 404);
        }

        // If user is not admin, ensure they own the return
        if ($user['role'] !== 'admin' && $return['naam'] !== $user['username']) {
            sendResponse(false, null, 'Unauthorized to update this return', 403);
        }

        // For non-admins, restrict fields they can update (e.g., no conditie change)
        if ($user['role'] !== 'admin') {
            $input['conditie'] = $return['conditie']; // preserve existing conditie
            $input['leerlingnr'] = $return['leerlingnr']; // preserve existing leerlingnr
            $input['naam'] = $return['naam']; // preserve existing naam
        }

        $stmt = $pdo->prepare("UPDATE returns SET artikel = ?, leerlingnr = ?, naam = ?, inleverdatum = ?, conditie = ?, opmerkingen = ? WHERE id = ?");
        $stmt->execute([
            $input['artikel'],
            $input['leerlingnr'],
            $input['naam'],
            $input['inleverdatum'],
            $input['conditie'] ?? 'goed',
            $input['opmerkingen'] ?? null,
            $input['id']
        ]);
        sendResponse(true, null, 'Return updated successfully');
        break;

    case 'DELETE':
        if ($user['role'] !== 'admin') {
            sendResponse(false, null, 'Admin access required', 403);
        }
        $input = getRequestBody();
        if (!isset($input['id'])) {
            sendResponse(false, null, 'ID is required', 400);
        }
        $stmt = $pdo->prepare("DELETE FROM returns WHERE id = ?");
        $stmt->execute([$input['id']]);
        sendResponse(true, null, 'Return deleted successfully');
        break;

    default:
        sendResponse(false, null, 'Method not allowed', 405);
    }
