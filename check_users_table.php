<?php
require_once 'magazijn-api/config.php';

try {
    $pdo = getDBConnection();
    echo "Database connection successful.\n";

    $table = 'users';
    echo "\n$table table:\n";
    $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
    if ($stmt->rowCount() > 0) {
        echo "Exists.\n";
        $stmt = $pdo->query("SELECT * FROM $table");
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (count($users) > 0) {
            echo "Users found:\n";
            foreach ($users as $user) {
                echo "- ID: {$user['id']}, Username: {$user['username']}, Role: {$user['role']}\n";
            }
        } else {
            echo "No users found in the table.\n";
        }
    } else {
        echo "Does not exist.\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
