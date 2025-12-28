import { TransactionType } from './TransactionType';

/**
 * Интерфейс транзакции
 */
export interface ITransaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: Date;
  
  toString(): string;
}
