# Краткая инструкция как можно запустить mvp-проект

**Инструкция временная, пока не "затащим" в docker**

1. Установить PostgreSQL.
2. Установить Directus в папку app/directus.
3. Импортировать в Directus `shanpshot.json`, `dish_*.json`, `dish.json` - в конце.
4. Установить Vue 3 в папку app/frontend.
5. Запустить directus и Vue 3. Должен отобразиться тестовый прием пищи.

**Если у вас установлен Docker**

1. Запустите контейнеры:
   `docker compose up -d`

2. Примените схему (используйте файл **snapshot-docker.json**):
   `MSYS_NO_PATHCONV=1 docker cp app/snapshot-docker.json web-project-directus-1:/directus/snapshot.json`
   `MSYS_NO_PATHCONV=1 docker compose exec directus node /directus/cli.js schema apply --yes /directus/snapshot.json`

3. Запустите фронтенд:
   `cd app/frontend && npm install && npm run dev`