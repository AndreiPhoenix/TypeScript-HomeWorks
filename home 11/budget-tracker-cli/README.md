# Budget Tracker CLI

Проект демонстрирует продвинутые возможности типизации TypeScript:
- Conditional Types
- Mapped Types
- Utility Types

## Особенности

1. **TransactionFieldType<TField>** - получает тип значения поля транзакции
2. **OptionalTransaction<TFields>** - делает указанные поля опциональными
3. **ReadonlyTransactionFields<TFields>** - делает указанные поля только для чтения
4. **IsIncome<T>** - проверяет, является ли транзакция доходом

## Запуск проекта
```
# Установка зависимостей
npm install
# Сборка проекта
npm run build
# Запуск в режиме разработки
npm run dev
# Запуск собранного проекта
npm start
```
# Структура проекта

## Как проверить выполнение задания:

1. **Компиляция TypeScript**:
```
npm run build
```

2. ***Запуск примера:**
```
npm run dev
```
