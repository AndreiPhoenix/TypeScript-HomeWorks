import { IAccount } from "../interfaces/IAccount.js";
import { ITransaction } from "../interfaces/ITransaction.js";
import { ISummary } from "../interfaces/ISummary.js";
import { TransactionType } from "../interfaces/TransactionType.js";
import { v4 as uuidv4 } from "uuid";
import { formatCurrency } from "formatCurrency.js";

export class Account implements IAccount {
  readonly id: string;
  name: string;
  balance: number;
  transactions: ITransaction[];

  constructor(name: string, initialBalance: number = 0) {
    this.id = uuidv4();
    this.name = name;
    this.balance = initialBalance;
    this.transactions = [];
  }

  addTransaction(transaction: ITransaction): void {
    this.transactions.push(transaction);
    if (transaction.type === TransactionType.Income) {
      this.balance += transaction.amount;
    } else {
      this.balance -= transaction.amount;
    }
  }

  removeTransaction(id: string): void {
    const index = this.transactions.findIndex((t) => t.id === id);
    if (index !== -1) {
      const transaction = this.transactions[index];
      if (transaction.type === TransactionType.Income) {
        this.balance -= transaction.amount;
      } else {
        this.balance += transaction.amount;
      }
      this.transactions.splice(index, 1);
    }
  }

  getBalance(): number {
    return this.balance;
  }

  getFormattedBalance(): string {
    return formatCurrency(this.balance);
  }

  getSummary(): ISummary {
    const totalIncome = this.transactions
      .filter((t) => t.type === TransactionType.Income)
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = this.transactions
      .filter((t) => t.type === TransactionType.Expense)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpenses,
      balance: this.balance,
      transactionCount: this.transactions.length,
    };
  }

  getTransactionsByCategory(category: string): ITransaction[] {
    return this.transactions.filter(
      (transaction) => transaction.category === category
    );
  }

  getTransactionsByDateRange(startDate: Date, endDate: Date): ITransaction[] {
    return this.transactions.filter(
      (transaction) =>
        transaction.date >= startDate && transaction.date <= endDate
    );
  }

  getFormattedSummary(): string {
    const summary = this.getSummary();
    return `
      Account: ${this.name}
      Balance: ${formatCurrency(summary.balance)}
      Total Income: ${formatCurrency(summary.totalIncome)}
      Total Expenses: ${formatCurrency(summary.totalExpenses)}
      Transaction Count: ${summary.transactionCount}
    `;
  }
}
