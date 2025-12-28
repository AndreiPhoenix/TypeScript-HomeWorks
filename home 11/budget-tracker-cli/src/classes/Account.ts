import { IAccount } from '../interfaces/IAccount';
import { ITransaction } from '../interfaces/ITransaction';
import { Transaction } from './Transaction';
import { 
  OptionalTransaction,
  TransactionPreview 
} from '../interfaces/utility-types';

export class Account implements IAccount {
  public id: string;
  public name: string;
  public balance: number;
  public currency: string;
  public createdAt: Date;
  public updatedAt: Date;
  private transactions: Transaction[] = [];

  constructor(data: Omit<IAccount, 'createdAt' | 'updatedAt'>) {
    this.id = data.id;
    this.name = data.name;
    this.balance = data.balance;
    this.currency = data.currency;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public addTransaction(transactionData: OptionalTransaction<'id' | 'date'>): Transaction {
    const transaction = new Transaction({
      ...transactionData,
      accountId: this.id
    });

    // Обновляем баланс
    if (transaction.type === 'income') {
      this.balance += transaction.amount;
    } else {
      this.balance -= transaction.amount;
    }

    this.transactions.push(transaction);
    this.updatedAt = new Date();
    
    return transaction;
  }

  public getTransactions(filters?: Partial<ITransaction>): Transaction[] {
    if (!filters) return [...this.transactions];

    return this.transactions.filter(transaction => {
      return Object.entries(filters).every(([key, value]) => {
        return transaction[key as keyof ITransaction] === value;
      });
    });
  }

  public getTransaction(id: string): Transaction | undefined {
    return this.transactions.find(t => t.id === id);
  }

  public getTransactionPreviews(): TransactionPreview[] {
    return this.transactions.map(t => ({
      id: t.id,
      amount: t.amount,
      type: t.type,
      description: t.description
    }));
  }

  public updateTransaction(
    id: string, 
    updates: Partial<Omit<ITransaction, 'id'>>
  ): Transaction | undefined {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) return undefined;

    const oldTransaction = this.transactions[index];
    
    // Восстанавливаем баланс от старой транзакции
    if (oldTransaction.type === 'income') {
      this.balance -= oldTransaction.amount;
    } else {
      this.balance += oldTransaction.amount;
    }

    const updatedTransaction = oldTransaction.update(updates);
    
    // Применяем новую транзакцию к балансу
    if (updatedTransaction.type === 'income') {
      this.balance += updatedTransaction.amount;
    } else {
      this.balance -= updatedTransaction.amount;
    }

    this.transactions[index] = updatedTransaction;
    this.updatedAt = new Date();
    
    return updatedTransaction;
  }

  public deleteTransaction(id: string): boolean {
    const index = this.transactions.findIndex(t => t.id === id);
    if (index === -1) return false;

    const transaction = this.transactions[index];
    
    // Обновляем баланс
    if (transaction.type === 'income') {
      this.balance -= transaction.amount;
    } else {
      this.balance += transaction.amount;
    }

    this.transactions.splice(index, 1);
    this.updatedAt = new Date();
    
    return true;
  }

  public updateAccount(updates: Partial<Omit<IAccount, 'id'>>): this {
    Object.assign(this, updates);
    this.updatedAt = new Date();
    return this;
  }

  public toJSON(): IAccount {
    return {
      id: this.id,
      name: this.name,
      balance: this.balance,
      currency: this.currency,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
