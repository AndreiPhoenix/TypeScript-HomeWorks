import { AccountManager } from './classes/AccountManager';
import { Transaction } from './classes/Transaction';
import { CategoryLimits } from './interfaces/utility-types';
import { TransactionConstructorParams, TransactionInstance } from './interfaces/constructor-types';
import * as readlineSync from 'readline-sync';

// Демонстрация использования всех утилитных типов
function demonstrateUtilityTypes(): void {
  console.log('=== Демонстрация утилитных типов TypeScript ===\n');

  const accountManager = new AccountManager();
  
  // Создаем аккаунт
  const account = accountManager.createAccount('Основной счет');
  console.log('1. Создан аккаунт:', account.getInfo());
  
  // Создаем транзакции
  const transaction1 = new Transaction(5000, 'income', 'Зарплата', 'доходы');
  const transaction2 = new Transaction(1500, 'expense', 'Продукты', 'еда');
  const transaction3 = new Transaction(3000, 'expense', 'Аренда', 'жилье');
  
  // Добавляем транзакции
  account.addTransaction(transaction1);
  account.addTransaction(transaction2);
  account.addTransaction(transaction3);
  
  console.log('\n2. Исходные транзакции:');
  account.transactions.forEach(t => {
    console.log(`   - ${t.type}: ${t.amount} руб. (${t.description})`);
  });
  
  // 1. Демонстрация частичного обновления
  console.log('\n3. Частичное обновление транзакции:');
  console.log('   До обновления:', transaction2.description, transaction2.amount);
  transaction2.update({ description: 'Продукты и напитки', amount: 1800 });
  console.log('   После обновления:', transaction2.description, transaction2.amount);
  
  // Демонстрация обновления аккаунта
  console.log('\n4. Обновление аккаунта:');
  console.log('   До обновления:', account.name, account.balance);
  account.update({ name: 'Основной банковский счет' });
  console.log('   После обновления:', account.name, account.balance);
  
  // 2. Демонстрация Required и Omit
  console.log('\n5. Использование Required и Omit:');
  const completeTransaction: import('./interfaces/utility-types').CompleteTransaction = {
    id: '123',
    amount: 1000,
    type: 'income',
    description: 'Полное описание',
    date: new Date(),
    category: 'доход'
  };
  console.log('   CompleteTransaction создан');
  
  const transactionWithoutDesc: import('./interfaces/utility-types').TransactionWithoutDescription = {
    id: '456',
    amount: 500,
    type: 'expense',
    date: new Date(),
    category: 'расход'
  };
  console.log('   TransactionWithoutDescription создан (без description)');
  
  // 3. Демонстрация Pick
  console.log('\n6. Использование Pick для preview:');
  const preview = transaction1.getPreview();
  console.log('   TransactionPreview:', preview);
  
  const accountInfo = account.getInfo();
  console.log('   AccountInfo:', accountInfo);
  
  // 4. Демонстрация Record
  console.log('\n7. Использование Record для лимитов:');
  const limits: CategoryLimits = {
    income: 10000,
    expense: 5000
  };
  console.log('   Лимиты:', limits);
  
  // 5. Демонстрация ConstructorParameters и InstanceType
  console.log('\n8. Использование ConstructorParameters и InstanceType:');
  
  // Параметры конструктора Transaction
  const transactionParams: TransactionConstructorParams = [
    2500, 'income', 'Бонус', 'премия'
  ];
  console.log('   TransactionConstructorParams:', transactionParams);
  
  // Создаем транзакцию с этими параметрами
  const newTransaction = new Transaction(...transactionParams);
  const transactionInstance: TransactionInstance = newTransaction;
  console.log('   TransactionInstance создан:', transactionInstance.id);
  
  // 6. Демонстрация nullable полей
  console.log('\n9. Nullable поля:');
  const transactionWithNullDesc: import('./interfaces/utility-types').NullableDescription = {
    id: '789',
    amount: 100,
    type: 'expense',
    description: null,
    date: new Date(),
    category: 'прочее'
  };
  console.log('   Транзакция с nullable description создана');
  
  // 7. Получение summary
  console.log('\n10. Сводка по аккаунту:');
  const summary = account.getSummary();
  console.log('   Total Income:', summary.totalIncome);
  console.log('   Total Expense:', summary.totalExpense);
  console.log('   Balance:', summary.balance);
  console.log('   Transaction Count:', summary.transactionCount);
  
  // Проверка лимитов
  console.log('\n11. Проверка лимитов:');
  const isWithinLimits = account.transactions.reduce((acc, t) => {
    if (t.type === 'income') acc.income += t.amount;
    if (t.type === 'expense') acc.expense += t.amount;
    return acc;
  }, { income: 0, expense: 0 });
  
  console.log('   Фактические расходы:', isWithinLimits.expense);
  console.log('   Лимит расходов:', limits.expense);
  console.log('   В пределах лимита?', isWithinLimits.expense <= limits.expense);
}

// Запуск демонстрации
function main() {
  console.log('💰 Budget Tracker CLI - Утилитные типы TypeScript\n');
  
  if (readlineSync.keyInYN('Запустить демонстрацию утилитных типов?')) {
    demonstrateUtilityTypes();
  } else {
    console.log('Программа завершена.');
  }
  
  console.log('\n✅ Демонстрация завершена. Все утилитные типы были применены:');
  console.log('   - Partial для обновлений');
  console.log('   - Required и Omit для валидации');
  console.log('   - Pick для выборки полей');
  console.log('   - Record для словарей');
  console.log('   - ConstructorParameters и InstanceType для работы с классами');
  console.log('   - Nullable поля для гибкости данных');
}

main();
