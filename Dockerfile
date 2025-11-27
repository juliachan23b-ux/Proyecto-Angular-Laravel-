# Dockerfile para Laravel + SQLite en Render Free
FROM php:8.2-cli

# Directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema y extensiones PHP necesarias
RUN apt-get update && apt-get install -y \
    libzip-dev unzip git \
    sqlite3 libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite pdo_mysql zip bcmath

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copiar backend completo
COPY backend/ /app/

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Crear base de datos SQLite vacía
RUN touch /app/database/database.sqlite \
    && chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

# Exponer puerto
EXPOSE 8080

# Comando para servir Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8080"]

