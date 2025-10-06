<?php
require_once 'magazijn-api/auth.php';

// Test login as admin with different passwords
$testUsers = [
    ['username' => 'admin', 'password' => 'admin'],
    ['username' => 'admin', 'password' => 'admin12'],
    ['username' => 'admin12', 'password' => 'admin12'],
    ['username' => 'admin12', 'password' => 'admin'],
];

foreach ($testUsers as $test) {
    $user = authenticateUser($test['username'], $test['password']);
    if ($user) {
        echo "Login successful for user: " . $user['username'] . " with password: " . $test['password'] . "\n";

        // Generate JWT token
        $token = generateToken($user);
        echo "JWT Token: " . $token . "\n";

        // Now test the users API by simulating the request
        $_SERVER['REQUEST_METHOD'] = 'GET';
        $_SERVER['HTTP_AUTHORIZATION'] = 'Bearer ' . $token;

        // Include the users.php file to test it
        echo "\nTesting users.php API:\n";
        ob_start();
        include 'magazijn-api/users.php';
        $output = ob_get_clean();
        echo $output;
        break;
    } else {
        echo "Login failed for user: " . $test['username'] . " with password: " . $test['password'] . "\n";
    }
}
?>
