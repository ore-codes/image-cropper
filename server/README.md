# Image Cropper Server

This is the backend server for the Image Cropper application. It handles image uploads and cropping operations.

## Requirements

- PHP 7.4 or higher
- GD library enabled in PHP
- Apache/Nginx web server
- Write permissions for the uploads directory

## Setup

1. Make sure PHP and the GD library are installed:
   ```bash
   # For Ubuntu/Debian
   sudo apt-get install php php-gd
   
   # For Windows
   # Enable extension=gd in php.ini
   ```

2. Configure your web server to point to this directory.

3. Create an uploads directory and set proper permissions:
   ```bash
   mkdir uploads
   chmod 777 uploads
   ```

## API Endpoints

### POST /upload.php

Handles image upload and cropping.

**Request Parameters:**
- `image`: The image file to upload
- `x`: X coordinate of the crop area
- `y`: Y coordinate of the crop area
- `width`: Width of the crop area
- `height`: Height of the crop area

**Response:**
```json
{
    "success": true,
    "original": "path/to/original/image.jpg",
    "cropped": "path/to/cropped/image.jpg"
}
```

## Error Handling

The server returns appropriate HTTP status codes and error messages in case of failures:

- 400 Bad Request: Invalid input or processing error
- 500 Internal Server Error: Server-side error

## Security Notes

- The server validates file types and sizes
- Files are stored with unique names to prevent overwrites
- CORS is configured to allow requests from any origin
