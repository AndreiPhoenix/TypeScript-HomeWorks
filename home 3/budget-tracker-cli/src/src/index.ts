import { runCalculationDemo } from './calculation-demo';

function main(): void {
  console.log('🚀 Budget Tracker CLI запущен!\n');
  
  // Запуск демонстрации расчетов
  runCalculationDemo();
  
  // Дополнительные тесты
  console.log('=== Дополнительные тесты функций ===');
  
  // Тест с пустым массивом
  console.log('\nТест с пустым массивом:');
  const emptyArray: number[] = [];
  console.log('calculateTotal([]):', calculateTotal(emptyArray));
  console.log('calculateAverage([]):', calculateAverage(emptyArray));
  
  // Тест с одним элементом
  console.log('\nТест с одним элементом:');
  const singleElement = [5000];
  console.log('calculateTotal([5000]):', calculateTotal(singleElement));
  console.log('calculateAverage([5000]):', calculateAverage(singleElement));
  
  // Тест с отрицательными числами
  console.log('\nТест с отрицательными числами:');
  const negativeValues = [-1000, -2000, -500];
  console.log('calculateTotal([-1000, -2000, -500]):', calculateTotal(negativeValues));
  console.log('getTopValues([-1000, -2000, -500], 2):', getTopValues(negativeValues, 2));
  
  console.log('\n✨ Budget Tracker CLI завершил работу!');
}

// Импорт функций для использования в index.ts
import { 
  calculateTotal, 
  calculateAverage, 
  getTopValues 
} from './functions';

// Запуск приложения
main();
