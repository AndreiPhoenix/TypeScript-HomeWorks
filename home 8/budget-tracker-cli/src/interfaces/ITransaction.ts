import { TransactionType } from "./TransactionType.js";

export interface ITransaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: Date;
  description?: string;
}
