FROM php:latest

# Installez Adminer
RUN mkdir /var/www/html/adminer && \
    curl -o /var/www/html/adminer/index.php https://www.adminer.org/latest-mysql-en.php

# Démarrez un serveur web PHP intégré
CMD ["php", "-S", "0.0.0.0:8080", "-t", "/var/www/html/adminer"]
