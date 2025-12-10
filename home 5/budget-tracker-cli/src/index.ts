import { Account, Transaction, AccountManager } from './classes';

// Создаём менеджер счетов
const accountManager = new AccountManager();

// Создаём счета
const mainAccount = new Account(1, "Основной счёт");
const savingsAccount = new Account(2, "Накопительный счёт");
const businessAccount = new Account(3, "Бизнес счёт");

// Создаём транзакции для основного счёта
const salary = new Transaction(1, 50000, 'income', '2024-01-15', 'Зарплата');
const rent = new Transaction(2, 25000, 'expense', '2024-01-16', 'Аренда квартиры');
const groceries = new Transaction(3, 5000, 'expense', '2024-01-17', 'Продукты');

// Добавляем транзакции в основной счёт
mainAccount.addTransaction(salary);
mainAccount.addTransaction(rent);
mainAccount.addTransaction(groceries);

// Создаём транзакции для накопительного счёта
const investment = new Transaction(4, 10000, 'income', '2024-01-10', 'Дивиденды');
const transfer = new Transaction(5, 5000, 'expense', '2024-01-12', 'Перевод на основной счёт');

savingsAccount.addTransaction(investment);
savingsAccount.addTransaction(transfer);

// Создаём транзакции для бизнес счёта
const clientPayment = new Transaction(6, 80000, 'income', '2024-01-20', 'Оплата от клиента');
const equipment = new Transaction(7, 30000, 'expense', '2024-01-21', 'Оборудование');
const marketing = new Transaction(8, 15000, 'expense', '2024-01-22', 'Маркетинг');

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
  console.log(`${account.name}: Баланс = ${account.balance.toFixed(2)}`);
});
