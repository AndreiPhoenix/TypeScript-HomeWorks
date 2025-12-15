import { ITransaction } from '../interfaces/ITransaction';
import { TransactionType } from '../interfaces/TransactionType';
import { TransactionUpdate } from '../interfaces/utility-types';

export class Transaction implements ITransaction {
  // Убираем readonly для возможности обновления
  public id: string;
  public amount: number;
  public type: TransactionType;
  public description: string;
  public date: Date;
  public category: string;

  constructor(
    amount: number,
    type: TransactionType,
    description: string,
    category: string,
    id?: string,
    date?: Date
  ) {
    this.id = id || Math.random().toString(36).substr(2, 9);
    this.amount = amount;
    this.type = type;
    this.description = description;
    this.category = category;
    this.date = date || new Date();
  }

  // 1. Метод для частичного обновления транзакции
  update(update: TransactionUpdate): void {
    if (update.id) {
      throw new Error('Cannot update transaction ID');
    }

    Object.assign(this, update);
  }

  // Метод для получения preview версии транзакции
  getPreview(): import('../interfaces/utility-types').TransactionPreview {
    const { id, amount, type, date } = this;
    return { id, amount, type, date };
  }
}
