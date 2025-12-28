import { 
  TransactionFieldType, 
  OptionalTransaction, 
  ReadonlyTransactionFields, 
  IsIncome,
  TransactionWithoutId,
  TransactionPreview,
  TransactionForUpdate
} from './utility-types';
import { ITransaction } from './ITransaction';

// Примеры использования созданных типов

// 1. Примеры использования TransactionFieldType
export type AmountType = TransactionFieldType<'amount'>; // number
export type DescriptionType = TransactionFieldType<'description'>; // string
export type DateType = TransactionFieldType<'date'>; // Date

// Попытка использовать несуществующее поле
export type InvalidFieldType = TransactionFieldType<'invalid'>; // never

// 2. Примеры использования OptionalTransaction
export type TransactionWithOptionalDesc = OptionalTransaction<'description'>;
export type PartialTransaction = OptionalTransaction<'description' | 'date' | 'category'>;
export type NewTransactionData = OptionalTransaction<'id'>; // Для создания новых транзакций

// 3. Примеры использования ReadonlyTransactionFields
export type TransactionWithReadonlyId = ReadonlyTransactionFields<'id'>;
export type ImmutableCoreFields = ReadonlyTransactionFields<'id' | 'date' | 'type'>;
export type ReadonlyIncomeTransaction = ReadonlyTransactionFields<'amount' | 'type'>;

// 4. Примеры использования IsIncome
type IncomeTransaction = { type: 'income', amount: number, description: string };
type ExpenseTransaction = { type: 'expense', amount: number, description: string };
type AnyObject = { foo: string };

export type IsIncome1 = IsIncome<IncomeTransaction>; // true
export type IsIncome2 = IsIncome<ExpenseTransaction>; // false
export type IsIncome3 = IsIncome<AnyObject>; // false

// Практические типы для различных сценариев
export type TransactionFilters = Partial<Pick<ITransaction, 'type' | 'category' | 'accountId'>>;
export type TransactionSummary = Pick<ITransaction, 'type' | 'amount' | 'category'>;
export type TransactionExport = Omit<ITransaction, 'accountId'> & { accountName: string };

// Тип для формы редактирования транзакции
export type TransactionEditForm = OptionalTransaction<'id' | 'date'> & {
  tags?: string[];
};

// Тип для отображения в UI
export type TransactionDisplay = Pick<ITransaction, 'id' | 'amount' | 'type' | 'description' | 'date'> & {
  formattedDate: string;
  formattedAmount: string;
  icon: string;
};

// Тип для аналитики
export type TransactionAnalytics = ReadonlyTransactionFields<'id' | 'amount' | 'type'> & {
  month: string;
  year: number;
  weekNumber: number;
};
