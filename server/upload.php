<?php
header('Content-Type: application/json');

include_once 'config.php';

// Create uploads directory if it doesn't exist
if (!file_exists(UPLOAD_DIR)) {
    mkdir(UPLOAD_DIR, 0777, true);
}

try {
    // Check if file was uploaded
    if (!isset($_FILES['image'])) {
        throw new Exception('No file uploaded');
    }

    $file = $_FILES['image'];
    
    // Validate file
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Upload failed with error code: ' . $file['error']);
    }

    if (!in_array($file['type'], ALLOWED_TYPES)) {
        throw new Exception('Invalid file type. Only JPG, PNG, and GIF are allowed.');
    }

    if ($file['size'] > MAX_FILE_SIZE) {
        throw new Exception('File size exceeds 5MB limit');
    }

    // Generate unique filename
    $extension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $filename = uniqid() . '.' . $extension;
    $uploadPath = UPLOAD_DIR . $filename;

    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        throw new Exception('Failed to move uploaded file');
    }

    // Get cropping parameters
    $x = isset($_POST['x']) ? (int)$_POST['x'] : 0;
    $y = isset($_POST['y']) ? (int)$_POST['y'] : 0;
    $width = isset($_POST['width']) ? (int)$_POST['width'] : 0;
    $height = isset($_POST['height']) ? (int)$_POST['height'] : 0;

    // Create cropped image
    $sourceImage = imagecreatefromstring(file_get_contents($uploadPath));
    $croppedImage = imagecrop($sourceImage, [
        'x' => $x,
        'y' => $y,
        'width' => $width,
        'height' => $height
    ]);

    if ($croppedImage === false) {
        throw new Exception('Failed to crop image');
    }

    // Save cropped image
    $croppedFilename = 'cropped_' . $filename;
    $croppedPath = UPLOAD_DIR . $croppedFilename;

    switch ($extension) {
        case 'jpg':
        case 'jpeg':
            imagejpeg($croppedImage, $croppedPath);
            break;
        case 'png':
            imagepng($croppedImage, $croppedPath);
            break;
        case 'gif':
            imagegif($croppedImage, $croppedPath);
            break;
    }

    // Clean up
    imagedestroy($sourceImage);
    imagedestroy($croppedImage);

    // Return success response
    echo json_encode([
        'success' => true,
        'original' => $uploadPath,
        'cropped' => $croppedPath
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
} 