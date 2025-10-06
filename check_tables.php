<?php
require_once 'magazijn-api/config.php';

try {
    $pdo = getDBConnection();
    echo "Database connection successful.\n";

    $tables = ['orders', 'returns'];
    foreach ($tables as $table) {
        echo "\n$table table:\n";
        $stmt = $pdo->query("SHOW TABLES LIKE '$table'");
        if ($stmt->rowCount() > 0) {
            echo "Exists.\n";
            $stmt = $pdo->query("DESCRIBE $table");
            $columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach ($columns as $col) {
                echo "- {$col['Field']}: {$col['Type']}\n";
            }
        } else {
            echo "Does not exist.\n";
        }
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
