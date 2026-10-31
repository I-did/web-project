## Запуск через Docker

Если установлен [Docker Desktop](https://www.docker.com/products/docker-desktop/), 
не нужно вручную устанавливать PostgreSQL и настраивать Directus.

1. Запустите бэкенд (Directus + PostgreSQL):
   Откройте терминал в корне проекта (где лежит `docker-compose.yml`) и выполните:

   docker compose up -d

2. Примените схему базы данных:

docker compose exec directus node /directus/cli.js schema apply --yes /directus/snapshot.json

⚠️ Пользователям Windows (Git Bash): Если команда выдает ошибку путей, добавьте в начало MSYS_NO_PATHCONV=1:
MSYS_NO_PATHCONV=1 docker compose exec directus node /directus/cli.js schema apply --yes /directus/snapshot.json

3. Импортируйте данные:

Откройте админку: http://localhost:8055
Войдите (Логин: admin@example.com, Пароль: admin12345)
В меню Content импортируйте справочники (dish_categories, dish_ingredients и т.д.), а в конце — dishes.

Запустите фронтенд:
Откройте второй терминал и выполните:

cd app/frontend
npm install
npm run dev
Фронтенд будет доступен по адресу: http://localhost:5173
