import { TransactionType } from './TransactionType';
import { ITransaction } from './ITransaction';
import { ISummary } from './ISummary';

/**
 * Маппированные типы для проекта
 */

// Тип для создания транзакции (без id и date)
export type CreateTransaction = Omit<ITransaction, 'id' | 'date'>;

// Тип для обновления транзакции (все свойства опциональны, кроме id)
export type UpdateTransaction = Partial<Omit<ITransaction, 'id'>> & { id: string };

// Тип для статистики по категориям
export type CategoryStats = {
  [category: string]: {
    total: number;
    count: number;
    type: TransactionType;
  };
};

// Тип для фильтрации транзакций
export type TransactionFilter = {
  type?: TransactionType;
  category?: string;
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
};

// Тип для группировки транзакций по дате
export type GroupedTransactions = {
  [date: string]: ITransaction[];
};

// Тип для расширенной сводки
export type ExtendedSummary = ISummary & {
  averageIncome: number;
  averageExpense: number;
  mostExpensiveCategory: string;
  mostFrequentCategory: string;
};
