# Use PHP 8.3 FPM base image
FROM php:8.3-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
  git \
  curl \
  nginx \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip \
  supervisor

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Set working directory
WORKDIR /var/www/html/public

# Copy public files
COPY public/ .

# Go back up to put config.php in /var/www/html
WORKDIR /var/www/html
COPY config.php .

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html
RUN chmod -R 775 /var/www/html/public/uploads

# Configure supervisord to run php-fpm and nginx together
RUN mkdir -p /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose HTTP port
EXPOSE 80

# Start supervisord
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
