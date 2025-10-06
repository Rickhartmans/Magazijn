<?php
// Simple test script to test login and registration APIs

function postRequest($url, $data) {
    $options = [
        'http' => [
            'header'  => "Content-type: application/json\r\n",
            'method'  => 'POST',
            'content' => json_encode($data),
            'ignore_errors' => true
        ]
    ];
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    return $result;
}

$baseUrl = 'https://magazijn.rickhartmans.nl/magazijn-api/';

echo "Testing Login API...\n";
$loginData = ['username' => 'testuser', 'password' => 'testpass'];
$loginResponse = postRequest($baseUrl . 'login.php', $loginData);
echo "Login Response: " . $loginResponse . "\n\n";

echo "Testing Register API...\n";
$registerData = ['username' => 'newuser', 'password' => 'newpass', 'confirmPassword' => 'newpass', 'role' => 'user'];
$registerResponse = postRequest($baseUrl . 'register.php', $registerData);
echo "Register Response: " . $registerResponse . "\n\n";
