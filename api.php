<?php
// Simple router to forward requests to files in magazijn-api/
header('Content-Type: application/json');

// 1) Prefer PATH_INFO (when server provides it): /api.php/login.php -> PATH_INFO = /login.php
$path = '';
if (!empty($_SERVER['PATH_INFO'])) {
    $path = ltrim($_SERVER['PATH_INFO'], '/');
}

// 2) Fallback: derive path from REQUEST_URI relative to SCRIPT_NAME
if ($path === '') {
    $requestUri = $_SERVER['REQUEST_URI'] ?? '';
    $scriptName = $_SERVER['SCRIPT_NAME'] ?? '';
    if ($requestUri && $scriptName && strpos($requestUri, $scriptName) !== false) {
        $path = trim(str_replace($scriptName, '', $requestUri), '/');
    }
}

// 3) Query param fallback: ?r=login.php
if ($path === '' && !empty($_GET['r'])) {
    $path = ltrim($_GET['r'], '/');
}

// If no path provided, return a helpful index listing (or 404)
if ($path === '') {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'No API endpoint specified']);
    exit;
}

$targetFile = __DIR__ . '/magazijn-api/' . $path;

if (file_exists($targetFile) && is_file($targetFile)) {
    include $targetFile;
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'API endpoint not found', 'path' => $path]);
}
