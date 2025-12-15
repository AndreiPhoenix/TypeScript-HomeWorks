// Демонстрация работы с функциями и классами

import { Expense, Income, BudgetManager } from './classes';
import { formatCurrency, calculateBalance } from './functions';

export function runCalculationDemo(): void {
    console.log('\n=== Демонстрация расчетов ===\n');
    
    // Создаем менеджер бюджета
    const budgetManager = new BudgetManager();
    
    // Добавляем доходы
    budgetManager.addOperation(new Income(1, 5000, 'Зарплата', 'Работа'));
    budgetManager.addOperation(new Income(2, 1000, 'Фриланс', 'Внешние проекты'));
    budgetManager.addOperation(new Income(3, 500, 'Инвестиции', 'Дивиденды'));
    
    // Добавляем расходы
    budgetManager.addOperation(new Expense(4, 1500, 'Аренда жилья', 'Жилье'));
    budgetManager.addOperation(new Expense(5, 300, 'Продукты', 'Питание'));
    budgetManager.addOperation(new Expense(6, 200, 'Транспорт', 'Проезд'));
    budgetManager.addOperation(new Expense(7, 100, 'Интернет', 'Коммуналка'));
    
    // Выводим все операции
    console.log('Все операции:');
    budgetManager.getAllOperations().forEach(op => {
        console.log(`- ${op.getDetails()}`);
    });
    
    // Генерируем отчет
    console.log(budgetManager.generateReport());
    
    // Демонстрация работы с функциями
    const transactions = budgetManager.getAllOperations().map(op => ({
        amount: op.getAmount(),
        category: { id: op.getId() }
    }));
    
    const balance = calculateBalance(transactions);
    console.log('Расчет через функцию calculateBalance:');
    console.log(`Доходы: ${formatCurrency(balance.income)}`);
    console.log(`Расходы: ${formatCurrency(balance.expenses)}`);
    console.log(`Баланс: ${formatCurrency(balance.balance)}`);
    
    // Тестируем удаление операции
    console.log('\n=== Тестирование удаления операции ===');
    const isRemoved = budgetManager.removeOperation(2);
    console.log(`Удаление операции с ID 2: ${isRemoved ? 'успешно' : 'не удалось'}`);
    console.log(`Осталось операций: ${budgetManager.getAllOperations().length}`);
    
    // Выводим обновленный баланс
    console.log('\nОбновленный баланс:', formatCurrency(budgetManager.getTotalBalance()));
}
