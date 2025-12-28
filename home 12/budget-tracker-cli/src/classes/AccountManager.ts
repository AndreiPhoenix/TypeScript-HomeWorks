import { IAccountManager } from '../interfaces/IAccountManager';
import { IAccount } from '../interfaces/IAccount';
import { ISummary } from '../interfaces/ISummary';
import { Account } from './Account';
import { v4 as uuidv4 } from 'uuid';
import { LogClass } from '../decorators/LogClass';
import { LogMethod } from '../decorators/LogMethod';
import { Metadata } from '../decorators/Metadata';

@LogClass
export class AccountManager implements IAccountManager {
  @Metadata('description', 'Массив всех счетов')
  public accounts: IAccount[];
  
  constructor() {
    this.accounts = [];
  }
  
  @LogMethod
  public addAccount(name: string, initialBalance: number = 0): IAccount {
    const id = `acc-${uuidv4().substring(0, 8)}`;
    const account = new Account(id, name, initialBalance);
    this.accounts.push(account);
    return account;
  }
  
  @LogMethod
  public removeAccount(id: string): boolean {
    const initialLength = this.accounts.length;
    this.accounts = this.accounts.filter(acc => acc.id !== id);
    return this.accounts.length !== initialLength;
  }
  
  @LogMethod
  public getAccountById(id: string): IAccount | undefined {
    return this.accounts.find(acc => acc.id === id);
  }
  
  public getTotalBalance(): number {
    return this.accounts.reduce((total, account) => total + account.balance, 0);
  }
  
  public getOverallSummary(): ISummary {
    let totalIncome = 0;
    let totalExpense = 0;
    let totalTransactions = 0;
    
    this.accounts.forEach(account => {
      const summary = account.getSummary();
      totalIncome += summary.totalIncome;
      totalExpense += summary.totalExpense;
      totalTransactions += summary.transactionCount;
    });
    
    return {
      accountId: 'overall',
      accountName: 'Общая сводка',
      totalIncome,
      totalExpense,
      balance: this.getTotalBalance(),
      transactionCount: totalTransactions,
    };
  }
  
  @LogMethod
  public exportToCsv(): string {
    const escapeCsv = (value: any): string => {
      if (typeof value === 'string') {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return String(value);
    };
    
    const headers = ['Тип', 'Сумма', 'Категория', 'Описание', 'Дата', 'Счет'];
    const rows: string[] = [];
    
    this.accounts.forEach(account => {
      account.getTransactions().forEach(transaction => {
        const row = [
          transaction.type === 'income' ? 'Доход' : 'Расход',
          transaction.amount,
          transaction.category,
          transaction.description || '',
          transaction.date.toISOString(),
          account.name
        ].map(escapeCsv);
        
        rows.push(row.join(','));
      });
    });
    
    return [headers.join(','), ...rows].join('\n');
  }
  
  // Дополнительные методы для удобства
  
  public getAccountByName(name: string): IAccount | undefined {
    return this.accounts.find(acc => acc.name === name);
  }
  
  public getAccountsWithNegativeBalance(): IAccount[] {
    return this.accounts.filter(acc => acc.balance < 0);
  }
  
  public getTopCategories(limit: number = 5): Array<{category: string, total: number}> {
    const categoryMap = new Map<string, number>();
    
    this.accounts.forEach(account => {
      account.getTransactions().forEach(transaction => {
        const current = categoryMap.get(transaction.category) || 0;
        categoryMap.set(transaction.category, current + transaction.amount);
      });
    });
    
    return Array.from(categoryMap.entries())
      .map(([category, total]) => ({ category, total }))
      .sort((a, b) => b.total - a.total)
      .slice(0, limit);
  }
}
