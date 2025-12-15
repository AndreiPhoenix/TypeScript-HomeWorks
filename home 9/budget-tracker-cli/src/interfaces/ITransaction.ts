import { TransactionType } from './TransactionType';

export interface ITransaction {
  id: string;
  amount: number;
  type: TransactionType;
  description: string;
  date: Date;
  category: string;
}
