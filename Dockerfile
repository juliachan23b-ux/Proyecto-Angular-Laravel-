# 1. Imagen base de PHP CLI (sin Apache)
FROM php:8.2-cli

# 2. Instala extensiones necesarias para Laravel
RUN apt-get update && apt-get install -y \
        libzip-dev \
        unzip \
        git \
    && docker-php-ext-install pdo_mysql zip \
    && a2enmod rewrite

# 3. Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4. Copia el backend de Laravel
COPY backend/ /var/www/html/

# 5. Configura directorio de trabajo
WORKDIR /var/www/html

# 6. Instala dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# 7. Configurar permisos correctos
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# 8. Configura Apache para usar public/
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf

# 9. Expone puerto
EXPOSE 80

# 10. Inicia Apache
CMD ["apache2-foreground"]
