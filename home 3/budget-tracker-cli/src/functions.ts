// 1. calculateTotal
export function calculateTotal(values: number[]): number {
  return values.reduce((sum, value) => sum + value, 0);
}

// 2. calculateAverage
export function calculateAverage(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return calculateTotal(values) / values.length;
}

// 3. formatCurrency
export function formatCurrency(amount: number, symbol: string): string {
  return `${amount} ${symbol}`;
}

// 4. getTopValues
export function getTopValues(values: number[], count: number): number[] {
  return [...values]
    .sort((a, b) => b - a)
    .slice(0, count);
}

// 5. printSummary
export function printSummary(values: number[]): void {
  const total = calculateTotal(values);
  const average = calculateAverage(values);
  
  console.log(`Всего записей: ${values.length}`);
  console.log(`Сумма: ${total}`);
  console.log(`Среднее: ${average}`);
}

// 6. Проверка решения
console.log('=== Тестирование функций из functions.ts ===');

// Тест calculateTotal
const testValues1 = [1000, 2000, 3000];
const totalResult = calculateTotal(testValues1);
console.log('calculateTotal([1000, 2000, 3000]):', totalResult);

// Тест calculateAverage
const averageResult = calculateAverage(testValues1);
console.log('calculateAverage([1000, 2000, 3000]):', averageResult);

// Тест formatCurrency
const currencyResult = formatCurrency(1000, '₽');
console.log('formatCurrency(1000, "₽"):', currencyResult);

// Тест getTopValues
const testValues2 = [100, 500, 200, 800];
const topValuesResult = getTopValues(testValues2, 2);
console.log('getTopValues([100, 500, 200, 800], 2):', topValuesResult);

// Тест printSummary
console.log('printSummary([100, 500, 1000, 2000, 800]):');
printSummary([100, 500, 1000, 2000, 800]);

console.log('=== Тестирование завершено ===\n');
