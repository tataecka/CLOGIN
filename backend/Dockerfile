FROM php:8.3-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_pgsql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy composer files
COPY composer.json composer.lock ./

# Install dependencies WITHOUT running Laravel scripts
RUN composer install --no-interaction --prefer-dist --optimize-autoloader --no-scripts
RUN apt-get install -y curl

# Copy all application files
COPY . .

# Now run Laravel package discovery (artisan is available)
RUN php artisan package:discover --ansi

# Make storage writable
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "public/index.php"]