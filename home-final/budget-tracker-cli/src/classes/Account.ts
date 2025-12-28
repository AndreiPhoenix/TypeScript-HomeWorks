import { IAccount } from '../interfaces/IAccount';
import { ITransaction } from '../interfaces/ITransaction';
import { TransactionType } from '../interfaces/TransactionType';
import { ISummary } from '../interfaces/ISummary';

export class Account implements IAccount {
  public id: string;
  public name: string;
  public transactions: ITransaction[];
  public balance: number;

  constructor(name: string) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.transactions = [];
    this.balance = 0;
  }

  addTransaction(transaction: ITransaction): void {
    this.transactions.push(transaction);
    if (transaction.type === TransactionType.INCOME) {
      this.balance += transaction.amount;
    } else {
      this.balance -= transaction.amount;
    }
  }

  removeTransaction(transactionId: string): boolean {
    const index = this.transactions.findIndex(t => t.id === transactionId);
    if (index !== -1) {
      const transaction = this.transactions[index];
      if (transaction.type === TransactionType.INCOME) {
        this.balance -= transaction.amount;
      } else {
        this.balance += transaction.amount;
      }
      this.transactions.splice(index, 1);
      return true;
    }
    return false;
  }

  getSummary(): ISummary {
    const totalIncome = this.transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = this.transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: this.balance,
      transactionCount: this.transactions.length
    };
  }

  getSummaryString(): string {
    const summary = this.getSummary();
    return `Счет: ${this.name}\nБаланс: $${summary.balance}\nДоходы: $${summary.totalIncome}\nРасходы: $${summary.totalExpenses}\nВсего транзакций: ${summary.transactionCount}`;
  }

  getTransactionsCSV(): string {
    const headers = ['ID', 'Дата', 'Тип', 'Сумма', 'Описание'];
    const rows = this.transactions.map(t => [
      t.id,
      t.date.toISOString().split('T')[0],
      t.type,
      t.amount.toString(),
      `"${t.description.replace(/"/g, '""')}"`
    ]);
    
    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }

  toString(): string {
    return `${this.name} (Баланс: $${this.balance})`;
  }
}
