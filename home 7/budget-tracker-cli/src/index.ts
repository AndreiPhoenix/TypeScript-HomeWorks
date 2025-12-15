/// <reference path="./interfaces/TransactionType.ts" />
/// <reference path="./interfaces/ITransaction.ts" />
/// <reference path="./interfaces/IAccount.ts" />
/// <reference path="./interfaces/ISummary.ts" />
/// <reference path="./interfaces/IAccountManager.ts" />

/// <reference path="./classes/Transaction.ts" />
/// <reference path="./classes/Account.ts" />
/// <reference path="./classes/AccountManager.ts" />

namespace BudgetTracker {
  // Пример использования
  const personalAccount = new Account(1, 'Личный бюджет');
  personalAccount.addTransaction(new Transaction(1, 1000, 'income', '2023-01-01T00:00:00Z', 'Зарплата'));
  personalAccount.addTransaction(new Transaction(2, 200, 'expense', '2023-01-05T00:00:00Z', 'Продукты'));
  personalAccount.addTransaction(new Transaction(3, 150, 'expense', '2023-01-10T00:00:00Z', 'Коммунальные услуги'));

  const businessAccount = new Account(2, 'Бизнес бюджет');
  businessAccount.addTransaction(new Transaction(1, 5000, 'income', '2023-01-15T00:00:00Z', 'Оплата проекта'));
  businessAccount.addTransaction(new Transaction(2, 1000, 'expense', '2023-01-20T00:00:00Z', 'Оборудование'));
  businessAccount.addTransaction(new Transaction(3, 300, 'expense', '2023-01-25T00:00:00Z', 'Интернет'));
  businessAccount.addTransaction(new Transaction(4, 700, 'income', '2023-01-30T00:00:00Z', 'Дополнительный заказ'));

  const manager = new AccountManager();
  manager.addAccount(personalAccount);
  manager.addAccount(businessAccount);

  // Вывод информации
  console.log('=== БЮДЖЕТНЫЙ ТРЕКЕР ===\n');
  
  console.log('📊 Сводка по всем бюджетам:');
  console.log(`Общий баланс всех бюджетов: ${manager.balance} ₽\n`);
  
  console.log('📋 Детализация по бюджетам:');
  manager.accounts.forEach(account => {
    console.log(account.toString());
    console.log('---');
  });
  
  console.log('\n📝 Транзакции личного бюджета:');
  personalAccount.getTransactions().forEach(t => console.log(t.toString()));
  
  console.log('\n📝 Транзакции бизнес бюджета:');
  businessAccount.getTransactions().forEach(t => console.log(t.toString()));
  
  console.log('\n🔍 Поиск транзакции по ID (ID: 2 в личном бюджете):');
  const foundTransaction = personalAccount.getTransactionById(2);
  if (foundTransaction) {
    console.log(`Найдена: ${foundTransaction.toString()}`);
  }
}
