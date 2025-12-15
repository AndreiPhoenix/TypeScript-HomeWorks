import { ITransaction } from "./ITransaction.js";
import { ISummary } from "./ISummary.js";

export interface IAccount {
  id: string;
  name: string;
  balance: number;
  transactions: ITransaction[];
  addTransaction(transaction: ITransaction): void;
  removeTransaction(id: string): void;
  getBalance(): number;
  getSummary(): ISummary;
  getTransactionsByCategory(category: string): ITransaction[];
  getTransactionsByDateRange(startDate: Date, endDate: Date): ITransaction[];
}
