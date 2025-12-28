import { AccountManager } from './classes/AccountManager';
import { Transaction } from './classes/Transaction';
import {
  TransactionFieldType,
  OptionalTransaction,
  ReadonlyTransactionFields,
  IsIncome,
  TransactionWithoutId,
  TransactionPreview
} from './interfaces/utility-types';
import { ITransaction } from './interfaces/ITransaction';

// Демонстрация работы с utility types

console.log('=== Демонстрация Utility Types ===\n');

// 1. TransactionFieldType
console.log('1. TransactionFieldType:');
type AmountField = TransactionFieldType<'amount'>; // number
type DateField = TransactionFieldType<'date'>; // Date
type InvalidField = TransactionFieldType<'invalid'>; // never

const amount: AmountField = 1000;
const date: DateField = new Date();
// const invalid: InvalidField = 'anything'; // Ошибка: тип never

console.log(`   Amount field type: ${typeof amount}, value: ${amount}`);
console.log(`   Date field type: ${typeof date}`);

// 2. OptionalTransaction
console.log('\n2. OptionalTransaction:');
type PartialTransaction = OptionalTransaction<'description' | 'date'>;

const partialTrans: PartialTransaction = {
  id: '123',
  amount: 500,
  type: 'expense',
  category: 'food',
  accountId: 'acc_1'
  // description и date опциональны
};

console.log(`   Partial transaction created:`, {
  id: partialTrans.id,
  amount: partialTrans.amount,
  hasDescription: 'description' in partialTrans
});

// 3. ReadonlyTransactionFields
console.log('\n3. ReadonlyTransactionFields:');
type ImmutableTransaction = ReadonlyTransactionFields<'id' | 'amount'>;

const immutableTrans: ImmutableTransaction = {
  id: 'trx_1',
  date: new Date(),
  amount: 300,
  type: 'income',
  description: 'Salary',
  category: 'income',
  accountId: 'acc_1'
};

// immutableTrans.id = 'new_id'; // Ошибка: поле только для чтения
// immutableTrans.amount = 400; // Ошибка: поле только для чтения
immutableTrans.description = 'Updated salary'; // Это можно изменить

console.log(`   Immutable transaction: ID=${immutableTrans.id}, Amount=${immutableTrans.amount}`);

// 4. IsIncome
console.log('\n4. IsIncome:');
type TestIncome = IsIncome<{ type: 'income', amount: 100 }>; // true
type TestExpense = IsIncome<{ type: 'expense', amount: 50 }>; // false

const incomeCheck: TestIncome = true;
const expenseCheck: TestExpense = false;

console.log(`   Is income check: ${incomeCheck}`);
console.log(`   Is expense check: ${expenseCheck}`);

// Практическое использование с AccountManager
console.log('\n=== Практический пример с AccountManager ===\n');

const accountManager = new AccountManager({
  id: 'acc_1',
  name: 'Main Account',
  balance: 10000,
  currency: 'USD'
});

// Добавляем транзакции с использованием OptionalTransaction
accountManager.addTransactionWithOptionalFields({
  amount: 2000,
  type: 'income',
  description: 'Freelance work',
  category: 'freelance'
  // date будет установлен автоматически
});

accountManager.addTransaction({
  date: new Date(),
  amount: 150,
  type: 'expense',
  description: 'Groceries',
  category: 'food',
  accountId: 'acc_1'
});

// Получаем транзакции с фильтрацией
const filters: OptionalTransaction<'type' | 'category'> = {
  type: 'expense',
  category: 'food'
};

const filteredTransactions = accountManager.getFilteredTransactions(filters);
console.log(`Filtered transactions (expense, food): ${filteredTransactions.length}`);

// Создаем неизменяемую версию транзакции
const transaction = accountManager.getTransactions()[0];
if (transaction) {
  const immutableVersion = accountManager.createImmutableTransaction(transaction.id, ['id', 'amount', 'type']);
  console.log(`\nImmutable transaction created:`, {
    id: immutableVersion?.id,
    amount: immutableVersion?.amount,
    type: immutableVersion?.type
  });
}

// Получаем сводку
const summary = accountManager.getSummary();
console.log('\nAccount Summary:');
console.log(`  Balance: $${summary.balance}`);
console.log(`  Total Income: $${summary.totalIncome}`);
console.log(`  Total Expenses: $${summary.totalExpenses}`);
console.log(`  Transactions by type:`, summary.transactionsByType);

// Пример использования в реальных сценариях
console.log('\n=== Реальные сценарии использования ===\n');

// Сценарий 1: Форма редактирования транзакции
type EditTransactionForm = OptionalTransaction<'id' | 'date'> & {
  tags?: string[];
};

const editForm: EditTransactionForm = {
  id: 'trx_123', // Опционально
  amount: 250,
  type: 'expense',
  description: 'Dinner with friends',
  category: 'dining',
  tags: ['social', 'food']
};

console.log('1. Форма редактирования:');
console.log(`   Amount: ${editForm.amount}, Tags: ${editForm.tags?.join(', ')}`);

// Сценарий 2: Экспорт данных
type ExportTransaction = OptionalTransaction<'accountId'> & {
  accountName: string;
  exportDate: string;
};

const exportData: ExportTransaction = {
  id: 'trx_123',
  date: new Date(),
  amount: 300,
  type: 'income',
  description: 'Consulting',
  category: 'services',
  accountName: 'Main Account',
  exportDate: new Date().toISOString()
};

console.log('\n2. Данные для экспорта:');
console.log(`   Account: ${exportData.accountName}, Amount: ${exportData.amount}`);

// Сценарий 3: Кэширование с read-only полями
type CachedTransaction = ReadonlyTransactionFields<'id' | 'amount' | 'date'> & {
  cachedAt: Date;
  expiresAt: Date;
};

const cachedTrans: CachedTransaction = {
  id: 'trx_456',
  amount: 500,
  date: new Date('2024-01-15'),
  type: 'expense',
  description: 'Monthly subscription',
  category: 'subscriptions',
  accountId: 'acc_1',
  cachedAt: new Date(),
  expiresAt: new Date(Date.now() + 3600000)
};

console.log('\n3. Кэшированная транзакция:');
console.log(`   Cached: ${cachedTrans.cachedAt.toISOString()}`);
console.log(`   Expires: ${cachedTrans.expiresAt.toISOString()}`);

console.log('\n=== Демонстрация завершена ===');
