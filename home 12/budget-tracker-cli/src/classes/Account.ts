import { IAccount } from '../interfaces/IAccount';
import { TransactionType } from '../interfaces/TransactionType';
import { ITransaction } from '../interfaces/ITransaction';
import { ISummary } from '../interfaces/ISummary';
import { Transaction } from './Transaction';
import { LogClass } from '../decorators/LogClass';
import { LogMethod } from '../decorators/LogMethod';
import { ReadOnly } from '../decorators/ReadOnly';
import { Metadata } from '../decorators/Metadata';

@LogClass
export class Account implements IAccount {
  @ReadOnly
  public id: string;
  
  @ReadOnly
  public name: string;
  
  public balance: number;
  
  @Metadata('description', 'Массив транзакций счета')
  public transactions: ITransaction[];
  
  constructor(id: string, name: string, initialBalance: number = 0) {
    this.id = id;
    this.name = name;
    this.balance = initialBalance;
    this.transactions = [];
  }
  
  @LogMethod
  public addTransaction(
    type: TransactionType,
    amount: number,
    category: string,
    description?: string
  ): ITransaction {
    const transaction = new Transaction(
      type,
      amount,
      category,
      description
    );
    
    this.transactions.push(transaction);
    this.balance = this.calculateBalance();
    
    return transaction;
  }
  
  @LogMethod
  public removeTransactionById(id: string): boolean {
    const initialLength = this.transactions.length;
    this.transactions = this.transactions.filter(t => t.id !== id);
    
    if (this.transactions.length !== initialLength) {
      this.balance = this.calculateBalance();
      return true;
    }
    
    return false;
  }
  
  @LogMethod
  public getTransactions(): ITransaction[] {
    return [...this.transactions];
  }
  
  public calculateBalance(): number {
    return this.transactions.reduce((total, transaction) => {
      return transaction.type === TransactionType.INCOME
        ? total + transaction.amount
        : total - transaction.amount;
    }, 0);
  }
  
  public getSummary(): ISummary {
    const income = this.transactions
      .filter(t => t.type === TransactionType.INCOME)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expense = this.transactions
      .filter(t => t.type === TransactionType.EXPENSE)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      accountId: this.id,
      accountName: this.name,
      totalIncome: income,
      totalExpense: expense,
      balance: this.balance,
      transactionCount: this.transactions.length,
    };
  }
  
  public getSummaryString(): string {
    const summary = this.getSummary();
    const description = Reflect.getMetadata('description', this, 'transactions') || 'Транзакции';
    
    return `
      Счет: ${summary.accountName} (${summary.accountId})
      Баланс: ${summary.balance.toFixed(2)}
      Доходы: ${summary.totalIncome.toFixed(2)}
      Расходы: ${summary.totalExpense.toFixed(2)}
      ${description}: ${summary.transactionCount}
    `.trim();
  }
}
