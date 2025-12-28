import { ITransaction } from '../interfaces/ITransaction';
import { TransactionType } from '../interfaces/TransactionType';

export class Transaction implements ITransaction {
  public id: string;
  public amount: number;
  public type: TransactionType;
  public date: Date;
  public description: string;

  constructor(amount: number, type: TransactionType, description: string, date?: Date) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.date = date || new Date();
  }

  toString(): string {
    const formattedDate = this.date.toISOString().split('T')[0];
    return `${formattedDate} - ${this.type === TransactionType.INCOME ? '+' : '-'}$${this.amount} - ${this.description}`;
  }
}
