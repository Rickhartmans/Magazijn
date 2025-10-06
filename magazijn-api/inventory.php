<?php
require_once 'auth.php';

$user = requireAuth();

$pdo = getDBConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        $stmt = $pdo->query("SELECT * FROM inventory ORDER BY id DESC");
        $items = $stmt->fetchAll();
        sendResponse(true, $items);
        break;

    case 'POST':
        if ($user['role'] !== 'admin') {
            sendResponse(false, null, 'Admin access required', 403);
        }
        $input = getRequestBody();
        if (!isset($input['naam']) || !isset($input['aantal'])) {
            sendResponse(false, null, 'Name and quantity are required', 400);
        }
        $stmt = $pdo->prepare("INSERT INTO inventory (naam, aantal, locatie, keuringsdatum, beschrijving) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([
            $input['naam'],
            $input['aantal'],
            $input['locatie'] ?? null,
            $input['keuringsdatum'] ?? null,
            $input['beschrijving'] ?? null
        ]);
        sendResponse(true, ['id' => $pdo->lastInsertId()], 'Item added successfully');
        break;

    case 'PUT':
        if ($user['role'] !== 'admin') {
            sendResponse(false, null, 'Admin access required', 403);
        }
        $input = getRequestBody();
        if (!isset($input['id'])) {
            sendResponse(false, null, 'ID is required', 400);
        }
        $stmt = $pdo->prepare("UPDATE inventory SET naam = ?, aantal = ?, locatie = ?, keuringsdatum = ?, beschrijving = ? WHERE id = ?");
        $stmt->execute([
            $input['naam'],
            $input['aantal'],
            $input['locatie'] ?? null,
            $input['keuringsdatum'] ?? null,
            $input['beschrijving'] ?? null,
            $input['id']
        ]);
        sendResponse(true, null, 'Item updated successfully');
        break;

    case 'DELETE':
        if ($user['role'] !== 'admin') {
            sendResponse(false, null, 'Admin access required', 403);
        }
        $input = getRequestBody();
        if (!isset($input['id'])) {
            sendResponse(false, null, 'ID is required', 400);
        }
        $stmt = $pdo->prepare("DELETE FROM inventory WHERE id = ?");
        $stmt->execute([$input['id']]);
        sendResponse(true, null, 'Item deleted successfully');
        break;

    default:
        sendResponse(false, null, 'Method not allowed', 405);
    }
