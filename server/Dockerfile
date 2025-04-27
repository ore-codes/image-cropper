FROM php:8.3-fpm

RUN apt-get update && apt-get install -y --no-install-recommends \
  git \
  curl \
  nginx \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip \
  supervisor && \
  apt-get clean && rm -rf /var/lib/apt/lists/* && \
  pkill nginx || true

RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

WORKDIR /var/www/html

COPY config.php .
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

COPY public/ public/

RUN chown -R www-data:www-data /var/www/html && \
  chmod -R 755 /var/www/html && \
  chmod -R 775 /var/www/html/public/uploads

EXPOSE 80

CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
