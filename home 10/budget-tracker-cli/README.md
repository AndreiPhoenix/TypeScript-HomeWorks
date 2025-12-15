# Budget Tracker CLI

CLI приложение для учета личного бюджета с возможностью экспорта транзакций в CSV-файл.

## Возможности

- Учет доходов и расходов
- Отслеживание баланса
- Экспорт всех транзакций в CSV-формат
- Автоматическое экранирование специальных символов в CSV

## Установка
```
npm install
npm run build
```

## Использование
```
# Сборка проекта
npm run build

# Запуск
npm start

# Запуск в режиме разработки
npm run dev
```

## Экспорт в CSV
Приложение автоматически экспортирует транзакции в файл transactions.csv при запуске.

Формат CSV файла:
```
id,amount,type,date,description
"1234567890000","500","income","2023-10-01T10:30:00.000Z","Зарплата"
"1234567891000","150","expense","2023-10-01T12:15:00.000Z","Продукты"
```

# Особенности реализации
Экранирование специальных символов: Функция escapeCsvValue корректно обрабатывает:

Запятые

Кавычки (одинарные и двойные)

Переносы строк

Табуляции

Асинхронная запись: Используется fs/promises для асинхронной работы с файловой системой

Обработка ошибок: Все ошибки записи файлов корректно обрабатываются и выводятся пользователю

Строгая типизация: Полная поддержка TypeScript с типами для всех функций и методов

```

## 8. Тестовый файл `src/__tests__/escapeCsvValue.test.ts`

```typescript
import { escapeCsvValue } from '../utils/escapeCsvValue';

describe('escapeCsvValue', () => {
    test('возвращает число как строку', () => {
        expect(escapeCsvValue(123)).toBe('123');
        expect(escapeCsvValue(0)).toBe('0');
        expect(escapeCsvValue(-456)).toBe('-456');
    });

    test('возвращает строку без изменений, если нет специальных символов', () => {
        expect(escapeCsvValue('Hello World')).toBe('Hello World');
        expect(escapeCsvValue('Product123')).toBe('Product123');
    });

    test('обрамляет кавычками строку с запятой', () => {
        expect(escapeCsvValue('Product, description')).toBe('"Product, description"');
    });

    test('экранирует двойные кавычки', () => {
        expect(escapeCsvValue('Product "special" edition')).toBe('"Product ""special"" edition"');
    });

    test('обрамляет кавычками строку с переносом строки', () => {
        expect(escapeCsvValue('Line1\nLine2')).toBe('"Line1\nLine2"');
    });

    test('обрамляет кавычками строку с табуляцией', () => {
        expect(escapeCsvValue('Column1\tColumn2')).toBe('"Column1\tColumn2"');
    });

    test('обрамляет кавычками строку с одинарными кавычками', () => {
        expect(escapeCsvValue("It's a test")).toBe('"It\'s a test"');
    });

    test('обрабатывает пустую строку', () => {
        expect(escapeCsvValue('')).toBe('');
    });

    test('обрабатывает строку только из специальных символов', () => {
        expect(escapeCsvValue(',"\n')).toBe('",""\n"');
    });
});
```
