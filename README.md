# РентДом - Сайт для аренды недвижимости

Современный сайт для краткосрочной аренды квартир, домов и студий, построенный на Next.js, React, TypeScript и Tailwind CSS.

## 🏠 Особенности

- � Современный адаптивный дизайн
- ⚡ Построен на Next.js 14 и React 18
- 🔒 TypeScript для безопасности типов
- 📱 Mobile-first подход
- 🎯 Оптимизирован для производительности
- 🌟 Красивые анимации и переходы
- �️ Система управления объектами недвижимости
- 📞 Интеграция с российскими мессенджерами
- 🔧 Конфигурируемые данные через .env

## 🚀 Начало работы

### Требования

- Node.js 18+
- npm или yarn

### Установка

1. Клонируйте репозиторий:

   ```bash
   git clone <repository-url>
   cd bonjoorhome-web
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Скопируйте `.env.local` и настройте ваши данные:

   ```bash
   cp .env.local.example .env.local
   ```

4. Запустите сервер разработки:

   ```bash
   npm run dev
   ```

5. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
bonjoorhome-web/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Основной макет
│   │   └── page.tsx            # Главная страница
│   ├── components/
│   │   ├── Header.tsx          # Шапка сайта
│   │   ├── Hero.tsx            # Главный блок
│   │   ├── Properties.tsx      # Каталог недвижимости
│   │   ├── About.tsx           # О компании
│   │   ├── Contact.tsx         # Контактная форма
│   │   └── Footer.tsx          # Подвал сайта
│   └── styles/
│       └── globals.css         # Глобальные стили
├── public/
│   ├── data/
│   │   └── properties.json     # Данные объектов
│   ├── images/                 # Изображения объектов
│   └── videos/                 # Видеофайлы
├── .env.local                  # Переменные окружения
├── next.config.js              # Конфигурация Next.js
├── tailwind.config.js          # Конфигурация Tailwind
├── tsconfig.json               # Конфигурация TypeScript
└── package.json
```

## ⚙️ Конфигурация

### Основные настройки (.env.local)

```env
# Основная информация
NEXT_PUBLIC_SITE_TITLE="РентДом"
NEXT_PUBLIC_PHONE_NUMBER="+7 (999) 123-45-67"
NEXT_PUBLIC_OWNER_NAME="Ваше Имя"

# Статистика
NEXT_PUBLIC_YEARS_EXPERIENCE="5+"
NEXT_PUBLIC_HAPPY_CLIENTS="150+"
NEXT_PUBLIC_PROPERTIES="30+"

# Контакты и соцсети
NEXT_PUBLIC_EMAIL="info@rentdom.ru"
NEXT_PUBLIC_WHATSAPP_LINK="https://wa.me/79991234567"
NEXT_PUBLIC_VIBER_LINK="viber://chat?number=%2B79991234567"
NEXT_PUBLIC_TELEGRAM_LINK="https://t.me/username"
NEXT_PUBLIC_AVITO_LINK="https://www.avito.ru/user/profile"
```

### Добавление объектов недвижимости

Отредактируйте файл `public/data/properties.json`:

```json
{
  "properties": [
    {
      "id": 1,
      "type": "1-комнатная квартира",
      "title": "Название объекта",
      "price": 3500,
      "address": "Адрес",
      "area": "35 м²",
      "rooms": 1,
      "floor": "5/9",
      "amenities": ["Wi-Fi", "Кухня", "Стиральная машина"],
      "description": "Описание объекта",
      "images": ["/images/apt1/main.jpg", "/images/apt1/kitchen.jpg"],
      "available": true,
      "rating": 4.8,
      "reviews": 23
    }
  ]
}
```

### Добавление изображений

1. Создайте папку для объекта в `public/images/`
2. Добавьте изображения в формате JPG/PNG
3. Обновите массив `images` в `properties.json`

### Добавление видео

1. Поместите видеофайл в `public/videos/`
2. Обновите `src` в компоненте Hero.tsx

## 🎨 Стек технологий

- **Фреймворк:** Next.js 14
- **Язык:** TypeScript
- **Стили:** Tailwind CSS
- **Иконки:** Lucide React
- **Деплой:** Vercel (рекомендуется)

## 📜 Доступные команды

- `npm run dev` - Запуск сервера разработки
- `npm run build` - Сборка для продакшена
- `npm run start` - Запуск продакшен-сервера
- `npm run lint` - Проверка кода

## 🚀 Деплой

### Vercel (Рекомендуется)

1. Загрузите код в GitHub
2. Подключите репозиторий к Vercel
3. Добавьте переменные окружения в настройках Vercel
4. Деплой выполнится автоматически

### Другие платформы

Проект можно развернуть на любой платформе, поддерживающей Next.js:

- Netlify
- AWS
- Google Cloud
- DigitalOcean

## 🔧 Настройка мессенджеров

### WhatsApp

Замените номер в ссылке: `https://wa.me/79991234567`

### Viber

Используйте схему: `viber://chat?number=%2B79991234567`

### Telegram

Укажите ваш username: `https://t.me/username`

### Авито

Добавьте ссылку на ваш профиль в Авито

## 📞 Поддержка

Для поддержки обращайтесь по контактам, указанным на сайте.

## 📄 Лицензия

Проект создан для демонстрационных целей. Свободно используйте и модифицируйте под ваши нужды.
