FROM php:8.3-fpm

RUN apt-get update && apt-get install -y \
  git curl nginx libpng-dev libjpeg-dev libgif-dev libonig-dev libxml2-dev zip unzip \
  && docker-php-ext-configure gd --with-jpeg \
  && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/html

COPY --chown=www-data:www-data config.php .
COPY --chown=www-data:www-data public/ public/

COPY nginx.conf /etc/nginx/nginx.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh && \
  chmod -R 755 /var/www/html && \
  chmod -R 775 /var/www/html/public/uploads

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s CMD curl -f http://localhost/ || exit 1
