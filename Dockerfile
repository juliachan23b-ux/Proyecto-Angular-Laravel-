FROM php:8.2-cli

WORKDIR /app

# Instalar extensiones necesarias
RUN apt-get update && apt-get install -y \
    libzip-dev unzip git \
    && docker-php-ext-install pdo_mysql zip

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copiar backend
COPY backend/ /app/

# Instalar dependencias de Laravel
RUN composer install --no-dev --optimize-autoloader

# Permisos
RUN chmod -R 755 /app/storage /app/bootstrap/cache

# Exponer puerto
EXPOSE 8080

# Servir Laravel desde public/
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]

