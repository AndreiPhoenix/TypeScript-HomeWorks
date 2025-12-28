import { ITransaction } from './ITransaction';

// 1. Условный тип TransactionFieldType<TField>
export type TransactionFieldType<TField> = 
  TField extends keyof ITransaction 
    ? ITransaction[TField] 
    : never;

// 2. Mapped type OptionalTransaction<TFields>
export type OptionalTransaction<TFields extends keyof ITransaction> = 
  Omit<ITransaction, TFields> & 
  Partial<Pick<ITransaction, TFields>>;

// Альтернативная реализация с mapped types
export type OptionalTransactionAlt<TFields extends keyof ITransaction> = {
  [K in keyof ITransaction as K extends TFields ? K : never]?: ITransaction[K];
} & {
  [K in keyof ITransaction as K extends TFields ? never : K]: ITransaction[K];
};

// 3. Mapped type ReadonlyTransactionFields<TFields>
export type ReadonlyTransactionFields<TFields extends keyof ITransaction> = 
  Readonly<Pick<ITransaction, TFields>> & 
  Omit<ITransaction, TFields>;

// Альтернативная реализация
export type ReadonlyTransactionFieldsAlt<TFields extends keyof ITransaction> = {
  readonly [K in TFields]: ITransaction[K];
} & {
  [K in Exclude<keyof ITransaction, TFields>]: ITransaction[K];
};

// 4. Условный тип IsIncome<T>
export type IsIncome<T> = T extends { type: 'income' } ? true : false;

// Дополнительные полезные типы
export type TransactionWithoutId = Omit<ITransaction, 'id'>;
export type TransactionPreview = Pick<ITransaction, 'id' | 'amount' | 'type' | 'description'>;
export type TransactionForUpdate = Partial<Omit<ITransaction, 'id'>>;
