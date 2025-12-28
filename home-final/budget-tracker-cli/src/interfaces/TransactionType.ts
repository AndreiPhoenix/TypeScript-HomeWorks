export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export type TransactionTypeStrings = keyof typeof TransactionType;
