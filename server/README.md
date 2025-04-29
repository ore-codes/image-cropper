# Server

PHP backend server for the Image Cropper project.

## Prerequisites

- Docker

## Getting Started

1. Build the image:
   ```bash
   docker build -t image-cropper-app .
   ```

2. Execute the image:
   ```bash
   docker run -it -p 8000:80 image-cropper-app
   ```

## Project Structure

```
server/
├── public/               # Publicly accessible directory
│   ├── uploads/          # Upload directory for processed images
│   ├── index.php         # Health check
│   ├── serve-image.php   # Image serving endpoint
│   └── upload.php        # Image upload and processing endpoint
├── config.php            # Server configuration (outside web root)
├── Dockerfile            # Docker configuration
├── docker-entrypoint.sh  # Entrypoint script
├── nginx.conf            # Full nginx configuration
```

## Development

- Backend runs locally on [http://localhost:8000](http://localhost:8000)
- Live deployment available at [https://imagecropper.onrender.com](https://imagecropper.onrender.com)

## Features

- Image upload handling
- Image cropping processing
- Secure file handling
- Error handling and logging
