import { runCalculationDemo } from './calculation-demo';

// Главная функция приложения
const main = (): void => {
  console.log('=================================');
  console.log('   BUDGET TRACKER CLI');
  console.log('=================================\n');
  
  // Запускаем демонстрацию функциональности
  runCalculationDemo();
  
  console.log('\n=================================');
  console.log('   РАБОТА ПРОГРАММЫ ЗАВЕРШЕНА');
  console.log('=================================');
};

// Запуск приложения
main();
