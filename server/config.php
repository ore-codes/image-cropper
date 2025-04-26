<?php
// Server Configuration
define('UPLOAD_DIR', 'uploads/');
define('ALLOWED_TYPES', [
    'image/jpeg',
    'image/png',
    'image/gif'
]);
define('MAX_FILE_SIZE', 5 * 2**20); // 5MB

// CORS Configuration
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
