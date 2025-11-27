# Usar PHP CLI con extensiones necesarias
FROM php:8.2-cli

WORKDIR /app

# Instalar extensiones y herramientas necesarias
RUN apt-get update && apt-get install -y \
    libzip-dev unzip git \
    && docker-php-ext-install pdo_sqlite pdo_mysql zip bcmath

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copiar backend
COPY backend/ /app/

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Crear archivo SQLite temporal
RUN touch /tmp/database.sqlite \
    && chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

# Exponer puerto
EXPOSE 8080

# Servir Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]
