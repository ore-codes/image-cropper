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
  supervisor && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Set working directory
WORKDIR /var/www/html

# Copy all non-public files first (config, nginx config, supervisord config)
COPY config.php .
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Copy public files last
COPY public/ public/

# Show the nginx config to confirm during build (optional)
RUN cat /etc/nginx/conf.d/default.conf

# Set permissions
RUN chown -R www-data:www-data /var/www/html && \
  chmod -R 755 /var/www/html && \
  chmod -R 775 /var/www/html/public/uploads

# Expose HTTP port
EXPOSE 80

# Start supervisord
CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
