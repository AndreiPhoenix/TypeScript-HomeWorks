import { IAccount } from '../interfaces/IAccount';
import { ITransaction } from '../interfaces/ITransaction';
import { AccountUpdate } from '../interfaces/utility-types';
import { Transaction } from './Transaction';

export class Account implements IAccount {
  // Убираем readonly для возможности обновления
  public id: string;
  public name: string;
  public balance: number;
  public transactions: ITransaction[];

  constructor(name: string, id?: string) {
    this.id = id || Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.balance = 0;
    this.transactions = [];
  }

  // 1. Метод для частичного обновления счёта
  update(update: AccountUpdate): void {
    if (update.id) {
      throw new Error('Cannot update account ID');
    }

    Object.assign(this, update);
  }

  // Метод для добавления транзакции
  addTransaction(transaction: ITransaction): void {
    this.transactions.push(transaction);
    
    if (transaction.type === 'income') {
      this.balance += transaction.amount;
    } else {
      this.balance -= transaction.amount;
    }
  }

  // Метод для удаления транзакции
  removeTransaction(transactionId: string): void {
    const index = this.transactions.findIndex(t => t.id === transactionId);
    
    if (index !== -1) {
      const transaction = this.transactions[index];
      
      // Корректируем баланс
      if (transaction.type === 'income') {
        this.balance -= transaction.amount;
      } else {
        this.balance += transaction.amount;
      }
      
      this.transactions.splice(index, 1);
    }
  }

  // Метод для получения информации об аккаунте
  getInfo(): import('../interfaces/utility-types').AccountInfo {
    const { id, name } = this;
    return { id, name };
  }

  // Метод для получения summary
  getSummary() {
    const totalIncome = this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      totalIncome,
      totalExpense,
      balance: this.balance,
      transactionCount: this.transactions.length
    };
  }
}
