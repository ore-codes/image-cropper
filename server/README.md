# Image Cropper Server

This is the server component of the Image Cropper application. It handles image uploads and cropping operations.

## Setup

### WSL Permissions Setup

Before proceeding with Apache setup, ensure proper permissions are set:

```bash
# Set ownership to your WSL user
sudo chown -R $USER:$USER /path/to/project

# Set directory permissions
sudo chmod -R 755 /path/to/project

# Set uploads directory permissions
sudo chmod -R 775 /path/to/project/server/uploads

# Set Apache config permissions
sudo chown -R $USER:$USER /etc/apache2/sites-available/image-cropper.conf
sudo chmod 644 /etc/apache2/sites-available/image-cropper.conf
```

### Apache Configuration

The server is configured to run on Apache with PHP-FPM. Here's the current setup:

- Port: 8000
- Document Root: `/path/to/project/server`
- PHP Handler: PHP-FPM 8.3

Access the server at: `http://localhost:8000`

### Endpoints

1. **Ping Test**
   - URL: `/ping.php`
   - Method: GET
   - Description: Simple endpoint to test if the server is running
   - Response: "pong"

2. **Image Upload**
   - URL: `/upload.php`
   - Method: POST
   - Description: Handles image upload and cropping
   - Parameters:
     - `image`: The image file to upload
     - `x`: X coordinate of crop start
     - `y`: Y coordinate of crop start
     - `width`: Width of crop area
     - `height`: Height of crop area
   - Response: JSON with status and cropped image URL

### Configuration

The server uses the following configuration (config.php):
- Upload directory: `uploads/`
- Maximum file size: 20MB
- Allowed file types: jpg, jpeg, png, gif

## Development

To modify the server configuration:
1. Edit `config.php` for basic settings
2. Update Apache configuration in `/etc/apache2/sites-available/image-cropper.conf`
3. Restart Apache: `sudo systemctl restart apache2`

## Security Notes

- Directory listing is disabled
- File uploads are restricted to image types
- Maximum file size is limited
- Upload directory permissions are set to 775
- Project directory permissions are set to 755
