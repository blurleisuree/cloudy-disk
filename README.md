# Cloudy Disk

Cloudy Disk — это веб-приложение для хранения и управления файлами. Позволяет пользователям регистрироваться, входить в систему, загружать и скачивать файлы. Проект построен на React с использованием Zustand для управления состоянием и Node.js для серверной части.

## Технологии

- **Frontend**:
  - React (v19.x)
  - React Router (v7.x)
  - Zustand (управление состоянием)
  - Tailwind css (стили)
  - React Query (для работы с API)

- **Backend**:
  - Node.js (v23.x)
  - Express.js
  - JWT (аутентификация)

- **База данных**
  - MongoDB Atlas

- **Дополнительно**:
  - LocalStorage (хранение токена)

## Зависимости

Полный список зависимостей указан в файлах `package.json` (для клиента и сервера). Основные библиотеки включают:

- **Frontend**:
  - `react`, `react-router`, `zustand`, `react-query`, `tailwindcss`, `yup`, `react-hook-form`, `eslint`
- **Backend**:
  - `express`, `jsonwebtoken`, `bcrypt`, `cors`, `express-validator`, `mongoose`, `nodemon`, `helmet`, `nodemailer`, `config`

Для детального обзора установите проект и изучите файлы `package.json`.

### Установка

1. Клонируйте репозиторий:
   git clone [git@github.com:blurleisuree/cloudy-disk.git](https://github.com/blurleisuree/cloudy-disk.git)
   cd cloudy-disk
2. Установите зависимости для сервера:

## Переменные окружения

- `REACT_APP_API_URL` — URL для API.
  - Локально: `http://localhost:5000/`
  - Продакшен: `https://cloudy-disk-server.onrender.com/`

Создай `.env.development` и `.env.production` в корне проекта.


## Лицензия

  Этот проект распространяется под лицензией MIT. См. [LICENSE](LICENSE) для подробностей.