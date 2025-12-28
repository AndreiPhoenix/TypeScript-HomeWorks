import { ITransaction } from './ITransaction';
import { IAccount } from './IAccount';
import { ISummary } from './ISummary';

export interface IAccountManager {
  addTransaction(transaction: Omit<ITransaction, 'id'>): ITransaction;
  getTransactions(filters?: Partial<ITransaction>): ITransaction[];
  getTransaction(id: string): ITransaction | undefined;
  updateTransaction(id: string, updates: Partial<ITransaction>): ITransaction | undefined;
  deleteTransaction(id: string): boolean;
  getAccount(): IAccount;
  updateAccount(updates: Partial<IAccount>): IAccount;
  getSummary(startDate?: Date, endDate?: Date): ISummary;
}
