import { 
  createAccountManager, 
  createAccount, 
  createTransaction,
  formatSummary,
  printTransactions 
} from './functions';

// Демонстрация расчетов и функциональности
export const runCalculationDemo = (): void => {
  console.log('🧮 ДЕМОНСТРАЦИЯ РАСЧЕТОВ БЮДЖЕТА\n');
  
  // Создаем менеджер счетов
  const accountManager = createAccountManager();
  
  // Создаем основной счет
  const mainAccount = createAccount(1, "Основной счет");
  
  // Добавляем разнообразные транзакции
  const demoTransactions = [
    createTransaction(1, 50000, "income", "Зарплата"),
    createTransaction(2, 15000, "expense", "Аренда квартиры"),
    createTransaction(3, 5000, "expense", "Продукты"),
    createTransaction(4, 3000, "expense", "Коммунальные услуги"),
    createTransaction(5, 10000, "income", "Фриланс"),
    createTransaction(6, 2000, "expense", "Транспорт"),
    createTransaction(7, 7000, "income", "Премия"),
    createTransaction(8, 4000, "expense", "Развлечения")
  ];
  
  console.log('1. Добавление транзакций:');
  demoTransactions.forEach(transaction => {
    mainAccount.addTransaction(transaction);
  });
  
  // Добавляем счет в менеджер
  accountManager.addAccount(mainAccount);
  
  console.log('\n2. Все транзакции счета:');
  const allTransactions = mainAccount.getTransactions();
  printTransactions(allTransactions);
  
  console.log('\n3. Сводная информация:');
  const summary = accountManager.getSummary(1);
  console.log(formatSummary(summary));
  
  // Демонстрация удаления транзакции
  console.log('4. Удаление транзакции (ID: 2):');
  mainAccount.removeTransactionById(2);
  
  console.log('\n5. Обновленная сводная информация:');
  const updatedSummary = accountManager.getSummary(1);
  console.log(formatSummary(updatedSummary));
  
  // Создаем второй счет для демонстрации работы с несколькими счетами
  console.log('6. Работа с несколькими счетами:');
  const savingsAccount = createAccount(2, "Накопительный счет");
  
  const savingsTransactions = [
    createTransaction(9, 10000, "income", "Перевод с основного счета"),
    createTransaction(10, 5000, "income", "Проценты по вкладу"),
    createTransaction(11, 2000, "expense", "Комиссия банка")
  ];
  
  savingsTransactions.forEach(transaction => {
    savingsAccount.addTransaction(transaction);
  });
  
  accountManager.addAccount(savingsAccount);
  
  console.log('\n7. Информация по всем счетам:');
  accountManager.getAccounts().forEach(account => {
    console.log(`\n📁 Счет: ${account.name}`);
    const accountSummary = accountManager.getSummary(account.id);
    console.log(formatSummary(accountSummary));
  });
  
  // Демонстрация поиска счета по ID
  console.log('8. Поиск счета по ID:');
  const foundAccount = accountManager.getAccountById(2);
  if (foundAccount) {
    console.log(`   Найден счет: "${foundAccount.name}"`);
    console.log(`   Транзакции счета "${foundAccount.name}":`);
    printTransactions(foundAccount.getTransactions());
  }
  
  console.log('\n✅ Демонстрация расчетов завершена!');
};
