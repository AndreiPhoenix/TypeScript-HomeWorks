# Budget Tracker CLI

Простое CLI приложение для отслеживания бюджета на TypeScript.

## Структура проекта
- budget-tracker-cli/
- ├── node_modules/
- ├── src/
- │ ├── index.ts
- │ └── calculation-demo.ts
- ├── dist/
- ├── package.json
- ├── tsconfig.json
- └── README.md


## Установка и запуск

1. Установите зависимости:
npm install
Соберите проект:

npm run build
Запустите приложение:

npm start
Или для демонстрации расчетов:

npm run demo
Скрипты
npm run build - компиляция TypeScript

npm start - запуск приложения

npm run dev - сборка и запуск

npm run demo - запуск демо расчетов


## Инструкции по запуску:

1. Создайте папку проекта:
mkdir budget-tracker-cli
cd budget-tracker-cli
Создайте все файлы как указано выше

Установите TypeScript:

npm install
Запустите приложение:

npm run dev
Ожидаемый вывод в консоль:
=== Budget Tracker Calculations ===
Общий доход: 50000 руб.
Общие расходы: 35000 руб.
Запланированные сбережения: 10000 руб.
Чистый доход: 15000 руб.
Оставшаяся сумма: 5000 руб.
✅ Отлично! У вас осталось 5000 руб. после всех расходов и сбережений.

Budget Tracker CLI запущен!
Для демонстрации расчетов смотрите вывод выше.
