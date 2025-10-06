<?php
require_once 'auth.php';

$user = requireAuth();

$pdo = getDBConnection();

$stats = [];

if ($user['role'] === 'admin') {
    // Total orders
    $stmt = $pdo->query("SELECT COUNT(*) as total_orders FROM orders");
    $stats['total_orders'] = $stmt->fetch()['total_orders'];

    // Pending orders
    $stmt = $pdo->query("SELECT COUNT(*) as pending_orders FROM orders WHERE status = 'pending'");
    $stats['pending_orders'] = $stmt->fetch()['pending_orders'];

    // Total returns
    $stmt = $pdo->query("SELECT COUNT(*) as total_returns FROM returns");
    $stats['total_returns'] = $stmt->fetch()['total_returns'];

    // Total inventory items
    $stmt = $pdo->query("SELECT COUNT(*) as total_inventory FROM inventory");
    $stats['total_inventory'] = $stmt->fetch()['total_inventory'];

    // Low stock items (assuming low stock is < 5)
    $stmt = $pdo->query("SELECT COUNT(*) as low_stock FROM inventory WHERE aantal < 5");
    $stats['low_stock'] = $stmt->fetch()['low_stock'];

    // Total users
    $stmt = $pdo->query("SELECT COUNT(*) as total_users FROM users");
    $stats['total_users'] = $stmt->fetch()['total_users'];
} else {
    // User's own orders
    $stmt = $pdo->prepare("SELECT COUNT(*) as my_orders FROM orders WHERE naam = ?");
    $stmt->execute([$user['username']]);
    $stats['my_orders'] = $stmt->fetch()['my_orders'];

    // User's pending orders
    $stmt = $pdo->prepare("SELECT COUNT(*) as my_pending_orders FROM orders WHERE naam = ? AND status = 'pending'");
    $stmt->execute([$user['username']]);
    $stats['my_pending_orders'] = $stmt->fetch()['my_pending_orders'];

    // User's returns
    $stmt = $pdo->prepare("SELECT COUNT(*) as my_returns FROM returns WHERE naam = ?");
    $stmt->execute([$user['username']]);
    $stats['my_returns'] = $stmt->fetch()['my_returns'];
}

sendResponse(true, $stats);
