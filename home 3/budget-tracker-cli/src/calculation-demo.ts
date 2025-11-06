import { 
  calculateTotal, 
  calculateAverage, 
  formatCurrency, 
  getTopValues, 
  printSummary 
} from './functions';

export function runCalculationDemo(): void {
  console.log('=== Демонстрация расчетов бюджета ===');
  
  // Пример доходов
  const incomes = [25000, 30000, 15000, 40000, 35000];
  console.log('\n📈 Анализ доходов:');
  console.log('Доходы:', incomes);
  console.log('Общий доход:', formatCurrency(calculateTotal(incomes), '₽'));
  console.log('Средний доход:', formatCurrency(calculateAverage(incomes), '₽'));
  console.log('Топ-3 дохода:', getTopValues(incomes, 3).map(amount => formatCurrency(amount, '₽')));
  
  // Пример расходов
  const expenses = [15000, 8000, 12000, 5000, 10000, 7000];
  console.log('\n📉 Анализ расходов:');
  console.log('Расходы:', expenses);
  console.log('Общий расход:', formatCurrency(calculateTotal(expenses), '₽'));
  console.log('Средний расход:', formatCurrency(calculateAverage(expenses), '₽'));
  console.log('Топ-3 расхода:', getTopValues(expenses, 3).map(amount => formatCurrency(amount, '₽')));
  
  // Баланс
  const totalIncome = calculateTotal(incomes);
  const totalExpense = calculateTotal(expenses);
  const balance = totalIncome - totalExpense;
  
  console.log('\n💰 Баланс:');
  console.log('Доходы:', formatCurrency(totalIncome, '₽'));
  console.log('Расходы:', formatCurrency(totalExpense, '₽'));
  console.log('Баланс:', formatCurrency(balance, '₽'));
  console.log(balance >= 0 ? '✅ Бюджет сбалансирован' : '❌ Превышение расходов');
  
  // Детальный отчет
  console.log('\n📊 Детальный отчет по доходам:');
  printSummary(incomes);
  
  console.log('\n📊 Детальный отчет по расходам:');
  printSummary(expenses);
  
  console.log('\n=== Демонстрация завершена ===\n');
}
