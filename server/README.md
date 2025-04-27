# Server

PHP backend server for the Image Cropper project.

## Prerequisites

- PHP 8.0 or higher
- Docker and Docker Compose (for containerized deployment)

## Getting Started

1. Build and start the containers:
```bash
docker-compose up -d --build
```

2. Stop the containers:
```bash
docker-compose down
```

3. View logs:
```bash
docker-compose logs -f
```

## Project Structure

```
server/
├── public/           # Publicly accessible directory
│   ├── uploads/      # Upload directory for processed images
│   ├── ping.php      # Health check endpoint
│   ├── serve-image.php # Image serving endpoint
│   └── upload.php    # Image upload and processing endpoint
├── config.php        # Server configuration (outside web root)
├── Dockerfile        # Docker configuration
├── docker-compose.yml # Docker Compose configuration
├── nginx.conf        # Nginx configuration
├── setup.sh          # Setup script
└── README.md         # This file
```

## Features

- Image upload handling
- Image cropping processing
- Secure file handling
- Error handling and logging

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
