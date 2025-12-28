import { ITransaction } from './ITransaction';

export interface IAccount {
  id: string;
  name: string;
  transactions: ITransaction[];
  balance: number;
  getSummaryString(): string;
}
