<?php
require_once 'magazijn-api/config.php';

try {
    $pdo = getDBConnection();
    echo "Database connection successful.\n";

    // Check if users table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'users'");
    if ($stmt->rowCount() > 0) {
        echo "Users table exists.\n";

        // Check columns
        $stmt = $pdo->query("DESCRIBE users");
        $columns = $stmt->fetchAll(PDO::FETCH_COLUMN);
        $required = ['id', 'username', 'password_hash', 'role'];
        $missing = array_diff($required, $columns);
        if (empty($missing)) {
            echo "All required columns present.\n";
        } else {
            echo "Missing columns: " . implode(', ', $missing) . "\n";
        }
    } else {
        echo "Users table does not exist.\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
