import { IAccount } from './IAccount';
import { ITransaction } from './ITransaction';

export interface IAccountManager {
  createAccount(name: string): IAccount;
  getAccount(id: string): IAccount | undefined;
  getAllAccounts(): IAccount[];
  addTransaction(accountId: string, transaction: ITransaction): void;
  removeTransaction(accountId: string, transactionId: string): void;
  getAccountSummary(accountId: string): {
    totalIncome: number;
    totalExpense: number;
    balance: number;
    transactionCount: number;
  };
}
