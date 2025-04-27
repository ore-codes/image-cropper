# Server

PHP backend server for the Image Cropper project.

## Prerequisites

- PHP 8.0 or higher
- Composer (PHP package manager)
- Web server (Apache/Nginx)

## Getting Started

1. Install dependencies:
```bash
composer install
```

2. Configure your web server:

### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName localhost
    DocumentRoot /path/to/server
    
    <Directory /path/to/server>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name localhost;
    root /path/to/server;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
    
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

3. Set up file permissions:
```bash
chmod -R 755 /path/to/server
chown -R www-data:www-data /path/to/server
```

## Project Structure

```
server/
├── uploads/          # Upload directory for processed images
├── config.php        # Server configuration
├── ping.php          # Health check endpoint
├── serve-image.php   # Image serving endpoint
├── upload.php        # Image upload and processing endpoint
└── README.md         # This file
```

## Features

- Image upload handling
- Image cropping processing
- Secure file handling
- Error handling and logging

## License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.
