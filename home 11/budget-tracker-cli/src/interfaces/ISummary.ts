import { TransactionType } from './TransactionType';

export interface ISummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  byCategory: Record<string, { income: number; expenses: number }>;
  transactionsByType: Record<TransactionType, number>;
  lastUpdated: Date;
}
