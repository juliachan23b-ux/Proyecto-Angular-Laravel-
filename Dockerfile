# 1. Imagen base de PHP con Apache
FROM php:8.2-apache

# 2. Instala extensiones necesarias para Laravel
RUN apt-get update && apt-get install -y \
        libzip-dev \
        unzip \
        git \
    && docker-php-ext-install pdo_mysql zip

# 3. Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4. Copia el backend de Laravel al contenedor
COPY backend/ /var/www/html/

# 5. Copia Angular compilado a public/ (ya lo hiciste con ng build)
COPY backend/public/ /var/www/html/public/

# 6. Da permisos al usuario www-data
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# 7. Expone el puerto 10000 para Render
EXPOSE 10000

# 8. Comando para iniciar Apache
CMD ["apache2-foreground"]
