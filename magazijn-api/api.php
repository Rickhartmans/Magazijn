<?php
// Simple router to forward requests to magazijn-api folder files
$request = $_SERVER['REQUEST_URI'];
$scriptName = basename(__FILE__);
$basePath = dirname($_SERVER['SCRIPT_NAME']);

$path = str_replace($basePath . '/api.php', '', $request);
$path = trim($path, '/');

$targetFile = __DIR__ . '/' . $path;

if (file_exists($targetFile) && is_file($targetFile)) {
    include $targetFile;
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'API endpoint not found']);
}
