/**
 * Перечисление типов транзакций
 * INCOME - доход (поступление денег)
 * EXPENSE - расход (трата денег)
 */
export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

/**
 * Получить локализованное название типа транзакции
 * @param type - тип транзакции
 * @returns локализованная строка
 */
export function getTransactionTypeLabel(type: TransactionType): string {
  const labels = {
    [TransactionType.INCOME]: 'Доход',
    [TransactionType.EXPENSE]: 'Расход'
  };
  return labels[type] || 'Неизвестный тип';
}

/**
 * Получить символ типа транзакции
 * @param type - тип транзакции
 * @returns символ (+ для дохода, - для расхода)
 */
export function getTransactionTypeSymbol(type: TransactionType): string {
  return type === TransactionType.INCOME ? '+' : '-';
}

/**
 * Получить цвет для типа транзакции (для консоли или UI)
 * @param type - тип транзакции
 * @returns ANSI код цвета или CSS класс
 */
export function getTransactionTypeColor(type: TransactionType): string {
  const colors = {
    [TransactionType.INCOME]: '\x1b[32m', // зеленый
    [TransactionType.EXPENSE]: '\x1b[31m'  // красный
  };
  return colors[type] || '\x1b[0m'; // сброс цвета по умолчанию
}

/**
 * Проверить, является ли значение валидным типом транзакции
 * @param value - проверяемое значение
 * @returns true если значение является валидным TransactionType
 */
export function isValidTransactionType(value: any): value is TransactionType {
  return Object.values(TransactionType).includes(value);
}

/**
 * Преобразовать строку в TransactionType
 * @param str - строка для преобразования
 * @returns TransactionType или undefined если не удалось преобразовать
 */
export function stringToTransactionType(str: string): TransactionType | undefined {
  const normalized = str.toLowerCase().trim();
  if (normalized === 'income' || normalized === 'доход') {
    return TransactionType.INCOME;
  } else if (normalized === 'expense' || normalized === 'расход') {
    return TransactionType.EXPENSE;
  }
  return undefined;
}

/**
 * Тип для фильтрации по типу транзакции
 */
export type TransactionTypeFilter = TransactionType | 'all';

/**
 * Функция для фильтрации транзакций по типу
 * @param transactions - массив транзакций
 * @param typeFilter - фильтр типа
 * @returns отфильтрованный массив транзакций
 */
export function filterByTransactionType<T extends { type: TransactionType }>(
  transactions: T[],
  typeFilter: TransactionTypeFilter
): T[] {
  if (typeFilter === 'all') {
    return transactions;
  }
  return transactions.filter(transaction => transaction.type === typeFilter);
}
