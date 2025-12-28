/**
 * Интерфейс сводки по счету
 */
export interface ISummary {
  accountId: string;
  accountName: string;
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
}
