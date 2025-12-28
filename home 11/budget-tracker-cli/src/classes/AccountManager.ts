import { IAccountManager } from '../interfaces/IAccountManager';
import { ITransaction } from '../interfaces/ITransaction';
import { IAccount } from '../interfaces/IAccount';
import { ISummary } from '../interfaces/ISummary';
import { Account } from './Account';
import { Transaction } from './Transaction';
import { 
  OptionalTransaction,
  ReadonlyTransactionFields,
  TransactionFilters,
  TransactionSummary 
} from '../interfaces/utility-types';

export class AccountManager implements IAccountManager {
  private account: Account;

  constructor(initialAccountData: Omit<IAccount, 'createdAt' | 'updatedAt'>) {
    this.account = new Account(initialAccountData);
  }

  addTransaction(transactionData: Omit<ITransaction, 'id'>): ITransaction {
    return this.account.addTransaction(transactionData);
  }

  getTransactions(filters?: Partial<ITransaction>): ITransaction[] {
    return this.account.getTransactions(filters);
  }

  getTransaction(id: string): ITransaction | undefined {
    return this.account.getTransaction(id);
  }

  updateTransaction(id: string, updates: Partial<ITransaction>): ITransaction | undefined {
    // Убираем id из updates, если он там есть
    const { id: _, ...safeUpdates } = updates;
    return this.account.updateTransaction(id, safeUpdates);
  }

  deleteTransaction(id: string): boolean {
    return this.account.deleteTransaction(id);
  }

  getAccount(): IAccount {
    return this.account.toJSON();
  }

  updateAccount(updates: Partial<IAccount>): IAccount {
    const { id: _, ...safeUpdates } = updates;
    this.account.updateAccount(safeUpdates);
    return this.getAccount();
  }

  getSummary(startDate?: Date, endDate?: Date): ISummary {
    const transactions = this.account.getTransactions();
    let filteredTransactions = transactions;

    if (startDate || endDate) {
      filteredTransactions = transactions.filter(t => {
        const transactionDate = t.date.getTime();
        const isAfterStart = !startDate || transactionDate >= startDate.getTime();
        const isBeforeEnd = !endDate || transactionDate <= endDate.getTime();
        return isAfterStart && isBeforeEnd;
      });
    }

    const summary: ISummary = {
      totalIncome: 0,
      totalExpenses: 0,
      balance: this.account.balance,
      byCategory: {},
      transactionsByType: {
        income: 0,
        expense: 0
      },
      lastUpdated: new Date()
    };

    filteredTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        summary.totalIncome += transaction.amount;
        summary.transactionsByType.income++;
      } else {
        summary.totalExpenses += transaction.amount;
        summary.transactionsByType.expense++;
      }

      if (!summary.byCategory[transaction.category]) {
        summary.byCategory[transaction.category] = { income: 0, expenses: 0 };
      }

      if (transaction.type === 'income') {
        summary.byCategory[transaction.category].income += transaction.amount;
      } else {
        summary.byCategory[transaction.category].expenses += transaction.amount;
      }
    });

    return summary;
  }

  // Дополнительные методы с использованием utility types

  public getFilteredTransactions(filters: TransactionFilters): Transaction[] {
    return this.account.getTransactions(filters);
  }

  public createImmutableTransaction<T extends keyof ITransaction>(
    id: string,
    readonlyFields: T[]
  ): ReadonlyTransactionFields<T> | undefined {
    const transaction = this.getTransaction(id);
    if (!transaction) return undefined;

    const transObj = new Transaction(transaction);
    return transObj.createImmutableCopy(readonlyFields);
  }

  public getTransactionSummaries(): TransactionSummary[] {
    return this.account.getTransactions().map(t => ({
      type: t.type,
      amount: t.amount,
      category: t.category
    }));
  }

  public addTransactionWithOptionalFields(
    data: OptionalTransaction<'id' | 'date' | 'description'>
  ): Transaction {
    return this.account.addTransaction({
      ...data,
      accountId: this.account.id
    } as Omit<ITransaction, 'id'>);
  }
}
