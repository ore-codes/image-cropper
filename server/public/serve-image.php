<?php
// Allow CORS
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

include_once __DIR__ . '/../config.php';

// Get the filename from the URL
$filename = basename($_GET['file']);
$filepath = UPLOAD_DIR . $filename;

// Validate the file exists and is an image
if (!file_exists($filepath)) {
    http_response_code(404);
    die('File not found');
}

// Get the MIME type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime_type = finfo_file($finfo, $filepath);
finfo_close($finfo);

// Validate it's an image
if (!in_array($mime_type, ALLOWED_TYPES)) {
    http_response_code(403);
    die('Invalid file type');
}

// Set the content type header
header('Content-Type: ' . $mime_type);
header('Content-Length: ' . filesize($filepath));

// Output the file
readfile($filepath); 