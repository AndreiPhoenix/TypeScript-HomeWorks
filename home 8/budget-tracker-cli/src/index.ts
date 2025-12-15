import { Transaction } from "./classes/Transaction.js";
import { Account } from "./classes/Account.js";
import { AccountManager } from "./classes/AccountManager.js";
import { TransactionType } from "./interfaces/TransactionType.js";
import moment from "moment";

// Пример использования
function main() {
  console.log("=== Budget Tracker CLI ===\n");

  // Создание менеджера аккаунтов
  const manager = new AccountManager();

  // Создание аккаунтов
  const mainAccount = new Account("Main Account", 1000);
  const savingsAccount = new Account("Savings Account", 5000);

  // Добавление аккаунтов в менеджер
  manager.addAccount(mainAccount);
  manager.addAccount(savingsAccount);

  // Создание транзакций с использованием moment для дат
  const salary = new Transaction(
    TransactionType.Income,
    3000,
    "Salary",
    moment("2024-01-15").toDate(),
    "Monthly salary"
  );

  const rent = new Transaction(
    TransactionType.Expense,
    1500,
    "Rent",
    moment("2024-01-05").toDate(),
    "Monthly rent payment"
  );

  const groceries = new Transaction(
    TransactionType.Expense,
    300,
    "Groceries",
    moment("2024-01-10").toDate(),
    "Weekly groceries"
  );

  const investment = new Transaction(
    TransactionType.Expense,
    1000,
    "Investment",
    moment("2024-01-20").toDate(),
    "Stock investment"
  );

  // Добавление транзакций
  mainAccount.addTransaction(salary);
  mainAccount.addTransaction(rent);
  mainAccount.addTransaction(groceries);
  savingsAccount.addTransaction(investment);

  // Вывод информации
  console.log("=== Account Details ===");
  console.log(mainAccount.getFormattedSummary());
  console.log(savingsAccount.getFormattedSummary());

  console.log("=== Transaction Details ===");
  console.log("Main Account Transactions:");
  mainAccount.transactions.forEach((transaction) => {
    console.log(transaction.toString());
  });

  console.log("\nSavings Account Transactions:");
  savingsAccount.transactions.forEach((transaction) => {
    console.log(transaction.toString());
  });

  console.log("\n=== Manager Summary ===");
  console.log(manager.getAccountSummary());

  // Пример фильтрации транзакций
  console.log("=== Filtered Transactions ===");
  const startDate = moment("2024-01-01").toDate();
  const endDate = moment("2024-01-31").toDate();
  const januaryTransactions = mainAccount.getTransactionsByDateRange(
    startDate,
    endDate
  );

  console.log(`Transactions in January: ${januaryTransactions.length}`);

  // Пример удаления транзакции
  console.log("\n=== After Removing a Transaction ===");
  if (mainAccount.transactions.length > 0) {
    const transactionToRemove = mainAccount.transactions[0].id;
    mainAccount.removeTransaction(transactionToRemove);
    console.log("Transaction removed.");
    console.log(mainAccount.getFormattedSummary());
  }

  // Пример использования uuid для проверки уникальности ID
  console.log("\n=== Transaction IDs ===");
  mainAccount.transactions.forEach((t, i) => {
    console.log(`Transaction ${i + 1}: ${t.id}`);
  });
}

// Запуск приложения
main();
