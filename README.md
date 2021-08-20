# tinkoff-invest-frontend

Это фронтенд часть сервиса tinkoff-invest. Репозиторий с бекендом [здесь](https://github.com/termitkin/tinkoff-invest-backend)

- Докер образ [бекенда](https://hub.docker.com/repository/docker/termitkin/tinkoff-invest-backend)
- Докер образ [фронтенда](https://hub.docker.com/repository/docker/termitkin/tinkoff-invest-frontend)

### Функции сайта

- Продажа и покупка бумаг
- Отображение портфеля
- Список лимитных заявок
- Стакан заявок
- Избранное

### Команда для сборки бекенда в докер образ

```
docker build -t termitkin/tinkoff-invest-frontend:latest .
```

### Запуск фронтенда и бекенда вместе

1. Скачать [docker-compose.yml](https://gist.github.com/termitkin/966ebfb4cfa71057cdbde19bbab0afb6)
2. Рядом с `docker-compose.yml` нужно положить файл `.env`, в котором должны быть три переменные: BOT_TOKEN, OWNER_ID и secretToken
3. Выполнить `docker-compose up -d`

### Блоки в конфиге nginx, которые нужны для контейнеров с бекендом и фронтендом:

```
# Tinkoff invest frontend
location ^~ /tinkoff-invest/BOT_TOKEN {
  proxy_pass http://localhost:3500/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}

# Tinkoff invest api
location ^~ /api/BOT_TOKEN {
  proxy_pass http://localhost:3025/api;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}

# Tinkoff invest ws
location ^~ /ws/BOT_TOKEN {
  proxy_pass http://localhost:3026/;
  proxy_http_version 1.1;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection 'upgrade';
  proxy_set_header Host $host;
  proxy_cache_bypass $http_upgrade;
}
```
