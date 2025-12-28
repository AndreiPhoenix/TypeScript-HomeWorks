import { ITransaction } from '../interfaces/ITransaction';
import { TransactionType } from '../interfaces/TransactionType';
import { 
  TransactionWithoutId,
  OptionalTransaction,
  ReadonlyTransactionFields,
  IsIncome
} from '../interfaces/utility-types';

export class Transaction implements ITransaction {
  public readonly id: string;
  public date: Date;
  public amount: number;
  public type: TransactionType;
  public description: string;
  public category: string;
  public accountId: string;

  constructor(data: TransactionWithoutId | OptionalTransaction<'id'>) {
    this.id = data.id || this.generateId();
    this.date = data.date || new Date();
    this.amount = data.amount;
    this.type = data.type;
    this.description = data.description || '';
    this.category = data.category || 'uncategorized';
    this.accountId = data.accountId;
  }

  private generateId(): string {
    return `trx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Использование IsIncome типа в методе
  public isIncome(): boolean {
    const result: IsIncome<this> = this.type === 'income' ? true as true : false as false;
    return result as boolean;
  }

  // Метод для создания обновленной версии транзакции
  public update(updates: Partial<ITransaction>): Transaction {
    return new Transaction({
      ...this,
      ...updates,
      id: this.id // Сохраняем тот же ID
    });
  }

  // Метод для создания копии с read-only полями
  public createImmutableCopy<T extends keyof ITransaction>(
    readonlyFields: T[]
  ): ReadonlyTransactionFields<T> {
    const copy = { ...this };
    return Object.freeze(copy) as ReadonlyTransactionFields<T>;
  }

  // Статический метод для создания частичной транзакции
  public static createPartial<T extends keyof ITransaction>(
    data: OptionalTransaction<T>
  ): Partial<ITransaction> {
    return data;
  }

  public toJSON(): ITransaction {
    return {
      id: this.id,
      date: this.date,
      amount: this.amount,
      type: this.type,
      description: this.description,
      category: this.category,
      accountId: this.accountId
    };
  }
}

// Пример использования утилитных типов
export type TransactionWithOptionalDate = OptionalTransaction<'date'>;
export type ReadonlyTransactionId = ReadonlyTransactionFields<'id'>;
