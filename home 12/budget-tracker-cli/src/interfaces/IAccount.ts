import { TransactionType } from './TransactionType';
import { ITransaction } from './ITransaction';
import { ISummary } from './ISummary';

export interface IAccount {
  id: string;
  name: string;
  balance: number;
  transactions: ITransaction[];
  
  addTransaction(
    type: TransactionType,
    amount: number,
    category: string,
    description?: string
  ): ITransaction;
  
  removeTransactionById(id: string): boolean;
  
  getTransactions(): ITransaction[];
  
  calculateBalance(): number;
  
  getSummary(): ISummary;
  
  getSummaryString(): string;
}
