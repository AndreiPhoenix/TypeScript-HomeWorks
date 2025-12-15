# Budget Tracker CLI

Проект для отслеживания бюджета с использованием TypeScript и пространств имен (namespace).

## Структура проекта
budget-tracker-cli/
├── src/
│ ├── interfaces/
│ │ ├── TransactionType.ts
│ │ ├── ITransaction.ts
│ │ ├── IAccount.ts
│ │ ├── ISummary.ts
│ │ └── IAccountManager.ts
│ ├── classes/
│ │ ├── Transaction.ts
│ │ ├── Account.ts
│ │ └── AccountManager.ts
│ └── index.ts
├── dist/
├── package.json
├── tsconfig.json
└── README.md


## Особенности реализации

1. **Пространства имен (Namespace)**: Все интерфейсы и классы объявлены внутри общего пространства имен `BudgetTracker`
2. **Строгая типизация**: Использованы TypeScript интерфейсы для определения контрактов
3. **Разделение ответственности**: Каждая сущность находится в отдельном файле
4. **Тройные слеши-ссылки**: Для подключения зависимостей между файлами используются `/// <reference path="..." />`

## Установка и запуск

```bash
# Установка зависимостей
npm install

# Компиляция TypeScript
npm run build

# Запуск приложения
npm start


## Инструкции по запуску:

1. Создайте структуру папок как указано выше
2. Скопируйте все файлы в соответствующие директории
3. Установите зависимости:
```bash
npm install
npm run build


Запустите приложение:
npm start
