import { TransactionType } from '../interfaces/TransactionType';
import { ITransaction } from '../interfaces/ITransaction';
import { v4 as uuidv4 } from 'uuid';
import { LogClass } from '../decorators/LogClass';
import { ReadOnly } from '../decorators/ReadOnly';

@LogClass
export class Transaction implements ITransaction {
  @ReadOnly
  public id: string;
  
  public type: TransactionType;
  public amount: number;
  public category: string;
  public description?: string;
  public date: Date;
  
  constructor(
    type: TransactionType,
    amount: number,
    category: string,
    description?: string
  ) {
    this.id = uuidv4();
    this.type = type;
    this.amount = amount;
    this.category = category;
    this.description = description;
    this.date = new Date();
  }
  
  public toString(): string {
    return `Transaction: ${this.type} | ${this.amount} | ${this.category} | ${this.description || ''}`;
  }
}
