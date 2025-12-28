import { TransactionType } from './TransactionType';

export interface ITransaction {
  id: string;
  date: Date;
  amount: number;
  type: TransactionType;
  description: string;
  category: string;
  accountId: string;
}
