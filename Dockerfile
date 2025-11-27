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

# 5. Copia Angular compilado (si ya hiciste ng build)
COPY backend/public/ /var/www/html/public/

# 6. Da permisos al usuario www-data
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# 7. Configura Apache para servir desde public/
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# 8. Exponer el puerto que Render detecta automáticamente
EXPOSE 80

# 9. Comando para iniciar Apache
CMD ["apache2-foreground"]
