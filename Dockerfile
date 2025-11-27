# 1. Imagen base de PHP con Apache
FROM php:8.2-apache

# 2. Instala extensiones necesarias para Laravel y herramientas
RUN apt-get update && apt-get install -y \
        libzip-dev \
        unzip \
        git \
        curl \
        nodejs \
        npm \
    && docker-php-ext-install pdo_mysql zip

# 3. Instala Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4. Copia el backend de Laravel
COPY backend/ /var/www/html/

# 5. Configura directorio de trabajo y permisos
WORKDIR /var/www/html
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# 6. Instala dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# 7. Si quieres compilar Angular dentro del contenedor (opcional)
# COPY frontend/ /var/www/frontend/
# RUN cd /var/www/frontend && npm install && npm run build --prod
# RUN cp -r /var/www/frontend/dist/* /var/www/html/public/

# 8. Configura Apache para servir desde public/
RUN sed -i 's|/var/www/html|/var/www/html/public|g' /etc/apache2/sites-available/000-default.conf
RUN a2enmod rewrite

# 9. Expone el puerto HTTP
EXPOSE 80

# 10. Comando para iniciar Apache
CMD ["apache2-foreground"]
