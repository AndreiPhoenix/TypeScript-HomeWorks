// Главный файл приложения Budget Tracker CLI

import { testGenerics } from './generics';
import { runCalculationDemo } from './calculation-demo';

console.log('=== Budget Tracker CLI ===\n');

// Меню выбора демонстрации
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Использование:');
    console.log('  npm start -- generics     - запустить демонстрацию Generics');
    console.log('  npm start -- calculations - запустить демонстрацию расчетов');
    console.log('  npm start -- all         - запустить все демонстрации');
    process.exit(0);
}

const command = args[0].toLowerCase();

switch (command) {
    case 'generics':
        testGenerics();
        break;
    
    case 'calculations':
        runCalculationDemo();
        break;
    
    case 'all':
        testGenerics();
        console.log('\n' + '='.repeat(50) + '\n');
        runCalculationDemo();
        break;
    
    default:
        console.log(`Неизвестная команда: ${command}`);
        console.log('Доступные команды: generics, calculations, all');
        break;
}

console.log('\n=== Программа завершена ===');
