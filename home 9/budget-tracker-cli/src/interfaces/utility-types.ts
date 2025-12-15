import { ITransaction } from './ITransaction';
import { IAccount } from './IAccount';
import { TransactionType } from './TransactionType';

// 1. Частичное обновление
export type TransactionUpdate = Partial<ITransaction> & { id?: never };
export type AccountUpdate = Partial<IAccount> & { id?: never };

// 2. Обязательные поля и исключения
export type CompleteTransaction = Required<ITransaction>;
export type TransactionWithoutDescription = Omit<ITransaction, 'description'>;

// 3. Выборка ключевых полей
export type TransactionPreview = Pick<ITransaction, 'id' | 'amount' | 'type' | 'date'>;
export type AccountInfo = Pick<IAccount, 'id' | 'name'>;

// 4. Словарь лимитов по категориям
export type CategoryLimits = Record<TransactionType, number>;

// 6. Работа с необязательными и nullable полями
export type NullableDescription = Omit<ITransaction, 'description'> & {
  description: string | null;
};
