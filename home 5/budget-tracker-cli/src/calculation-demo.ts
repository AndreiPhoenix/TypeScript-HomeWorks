import { Transaction, Account } from './classes';

// Демонстрация расчётов с транзакциями и счетами
export function demonstrateCalculations(): void {
  console.log('\n=== Демонстрация расчётов ===\n');
  
  // Создаём демонстрационный счёт
  const demoAccount = new Account(100, 'Демо-счёт');
  
  // Создаём демонстрационные транзакции
  const transactions = [
    new Transaction(1, 1000, 'income', '2024-01-01', 'Начальный взнос'),
    new Transaction(2, 500, 'expense', '2024-01-02', 'Покупка продуктов'),
    new Transaction(3, 300, 'income', '2024-01-03', 'Кэшбэк'),
    new Transaction(4, 200, 'expense', '2024-01-04', 'Транспорт'),
    new Transaction(5, 1500, 'income', '2024-01-05', 'Премия')
  ];
  
  // Добавляем все транзакции
  transactions.forEach(transaction => {
    demoAccount.addTransaction(transaction);
  });
  
  // Показываем детали по транзакциям
  console.log('Транзакции:');
  transactions.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.toString()}`);
  });
  
  console.log('\n--- Результаты расчётов ---');
  
  // Показываем отдельные суммы
  console.log(`Сумма всех доходов: ${demoAccount.income}`);
  console.log(`Сумма всех расходов: ${demoAccount.expenses}`);
  console.log(`Баланс: ${demoAccount.balance}`);
  
  // Показываем сводку
  console.log('\nСводка:');
  console.log(demoAccount.getSummaryString());
  
  // Демонстрация математических операций
  console.log('\n--- Дополнительные расчёты ---');
  
  const allAmounts = transactions.map(t => t.amount);
  const totalAmount = allAmounts.reduce((sum, amount) => sum + amount, 0);
  const avgAmount = totalAmount / transactions.length;
  
  console.log(`Общая сумма всех операций: ${totalAmount}`);
  console.log(`Средняя сумма операции: ${avgAmount.toFixed(2)}`);
  
  // Фильтрация по типу
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  console.log(`\nДоходов: ${incomeTransactions.length} на сумму ${demoAccount.income}`);
  console.log(`Расходов: ${expenseTransactions.length} на сумму ${demoAccount.expenses}`);
  
  // Проверка на положительный баланс
  const isPositiveBalance = demoAccount.balance > 0;
  console.log(`\nБаланс положительный: ${isPositiveBalance ? '✅ Да' : '❌ Нет'}`);
  
  if (isPositiveBalance) {
    console.log(`Можно позволить дополнительные расходы до: ${demoAccount.balance.toFixed(2)}`);
  } else {
    console.log('Внимание: отрицательный баланс!');
  }
}
