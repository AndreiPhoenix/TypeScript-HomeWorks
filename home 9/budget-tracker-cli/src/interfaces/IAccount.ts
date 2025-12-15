import { ITransaction } from './ITransaction';

export interface IAccount {
  id: string;
  name: string;
  balance: number;
  transactions: ITransaction[];
}
