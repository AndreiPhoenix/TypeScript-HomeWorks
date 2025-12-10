import { Account, Transaction, AccountManager } from './classes';
import { demonstrateCalculations } from './calculation-demo';
import { 
  createTransaction, 
  formatCurrency, 
  groupTransactionsByMonth,
  getTransactionsStats 
} from './functions';

// Создаём менеджер счетов
const accountManager = new AccountManager();

// Создаём счета
const mainAccount = new Account(1, "Основной счёт");
const savingsAccount = new Account(2, "Накопительный счёт");
const businessAccount = new Account(3, "Бизнес счёт");

// Используем функцию createTransaction для создания транзакций
const salary = createTransaction(1, 50000, 'income', 'Зарплата');
const rent = createTransaction(2, 25000, 'expense', 'Аренда квартиры');
const groceries = createTransaction(3, 5000, 'expense', 'Продукты');

// Добавляем транзакции в основной счёт
mainAccount.addTransaction(salary);
mainAccount.addTransaction(rent);
mainAccount.addTransaction(groceries);

// Создаём транзакции для накопительного счёта
const investment = createTransaction(4, 10000, 'income', 'Дивиденды');
const transfer = createTransaction(5, 5000, 'expense', 'Перевод на основной счёт');

savingsAccount.addTransaction(investment);
savingsAccount.addTransaction(transfer);

// Создаём транзакции для бизнес счёта
const clientPayment = createTransaction(6, 80000, 'income', 'Оплата от клиента');
const equipment = createTransaction(7, 30000, 'expense', 'Оборудование');
const marketing = createTransaction(8, 15000, 'expense', 'Маркетинг');

businessAccount.addTransaction(clientPayment);
businessAccount.addTransaction(equipment);
businessAccount.addTransaction(marketing);

// Добавляем счета в менеджер
accountManager.addAccount(mainAccount);
accountManager.addAccount(savingsAccount);
accountManager.addAccount(businessAccount);

// Демонстрация работы методов

console.log("=== Демонстрация работы системы учёта бюджета ===\n");

// 1. Показываем общую сводку
console.log("1. Общая сводка по всем счетам:");
console.log(accountManager.getSummaryString());
console.log();

// 2. Показываем детальную информацию по всем счетам
console.log("2. Детальная информация по всем счетам:");
console.log(accountManager.toString());

// 3. Показываем информацию по отдельному счёту
console.log("3. Информация по основному счёту:");
console.log(mainAccount.toString());

// 4. Тестируем получение счёта по ID
console.log("4. Поиск счёта по ID (ID=2):");
const foundAccount = accountManager.getAccountById(2);
if (foundAccount) {
  console.log(foundAccount.getSummaryString());
} else {
  console.log("Счёт не найден");
}
console.log();

// 5. Тестируем удаление счёта
console.log("5. Удаление счёта с ID=3:");
const isRemoved = accountManager.removeAccountById(3);
console.log(`Счёт удалён: ${isRemoved}`);
console.log(`Осталось счетов: ${accountManager.getAllAccounts().length}`);
console.log();

// 6. Обновлённая сводка после удаления
console.log("6. Обновлённая сводка:");
console.log(accountManager.getSummaryString());
console.log();

// 7. Показываем строковое представление транзакции
console.log("7. Пример строкового представления транзакции:");
console.log(salary.toString());
console.log();

// 8. Проверяем балансы
console.log("8. Проверка балансов:");
accountManager.getAllAccounts().forEach(account => {
  console.log(`${account.name}: Баланс = ${formatCurrency(account.balance)}`);
});

// 9. Демонстрация расчётов из calculation-demo.ts
console.log("\n");
demonstrateCalculations();

// 10. Дополнительная демонстрация функций из functions.ts
console.log("\n=== Дополнительная демонстрация функций ===\n");

// Группировка транзакций по месяцам
console.log("10. Группировка транзакций по месяцам:");
const allTransactions = accountManager.getAllAccounts().flatMap(acc => acc.transactions);
const groupedByMonth = groupTransactionsByMonth(allTransactions);

groupedByMonth.forEach((transactions, month) => {
  console.log(`  ${month}: ${transactions.length} транзакций`);
});

// Статистика по транзакциям
console.log("\n11. Статистика по всем транзакциям:");
const stats = getTransactionsStats(allTransactions);
console.log(`  Всего транзакций: ${stats.count}`);
console.log(`  Общий доход: ${formatCurrency(stats.totalIncome)}`);
console.log(`  Общий расход: ${formatCurrency(stats.totalExpenses)}`);
console.log(`  Средняя транзакция: ${formatCurrency(stats.averageTransaction)}`);
console.log(`  Самый большой доход: ${formatCurrency(stats.largestIncome)}`);
console.log(`  Самый большой расход: ${formatCurrency(stats.largestExpense)}`);

// Сортировка счетов по балансу
console.log("\n12. Счета отсортированные по балансу:");
const sortedAccounts = [...accountManager.getAllAccounts()].sort((a, b) => b.balance - a.balance);
sortedAccounts.forEach(account => {
  console.log(`  ${account.name}: ${formatCurrency(account.balance)}`);
});
