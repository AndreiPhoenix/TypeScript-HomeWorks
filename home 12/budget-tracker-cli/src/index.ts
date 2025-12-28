import 'reflect-metadata';
import { Account } from './classes/Account';
import { AccountManager } from './classes/AccountManager';
import { TransactionType } from './interfaces/TransactionType';
import { getAllMetadata, getPropertiesWithMetadata } from './decorators/Metadata';

/**
 * Демонстрация работы декораторов в budget-tracker-cli
 */
async function main() {
  console.log('='.repeat(60));
  console.log('ДЕМОНСТРАЦИЯ ДЕКОРАТОРОВ В BUDGET-TRACKER-CLI');
  console.log('='.repeat(60));
  
  try {
    // Часть 1: Демонстрация декораторов на классе Account
    console.log('\n1. ДЕМОНСТРАЦИЯ ДЕКОРАТОРОВ КЛАССА ACCOUNT:\n');
    
    // Создание счета (сработает @LogClass)
    console.log('Создание счета:');
    const account = new Account('acc-001', 'Основной счет', 1000);
    console.log(`Счет "${account.name}" создан успешно!\n`);
    
    // Попытка изменения свойств только для чтения (сработает @ReadOnly)
    console.log('Попытка изменения свойств только для чтения:');
    try {
      console.log('Попытка изменить id:');
      account.id = 'new-id-123'; // Должно вызвать ошибку
    } catch (error: any) {
      console.log(`✓ Ошибка при изменении id: ${error.message}`);
    }
    
    try {
      console.log('Попытка изменить name:');
      account.name = 'Новое имя'; // Должно вызвать ошибку
    } catch (error: any) {
      console.log(`✓ Ошибка при изменении name: ${error.message}`);
    }
    console.log();
    
    // Работа с метаданными
    console.log('Работа с метаданными:');
    const propsWithMetadata = getPropertiesWithMetadata(account);
    console.log(`Свойства с метаданными: ${propsWithMetadata.join(', ')}`);
    
    propsWithMetadata.forEach(prop => {
      const metadata = getAllMetadata(account, prop);
      console.log(`Метаданные свойства "${prop}":`, metadata);
    });
    console.log();
    
    // Добавление транзакций (сработает @LogMethod)
    console.log('Добавление транзакций:');
    const salary = account.addTransaction(
      TransactionType.INCOME,
      50000,
      'Зарплата',
      'Ежемесячная зарплата'
    );
    
    const rent = account.addTransaction(
      TransactionType.EXPENSE,
      25000,
      'Аренда',
      'Аренда квартиры'
    );
    
    const groceries = account.addTransaction(
      TransactionType.EXPENSE,
      8000,
      'Продукты',
      'Еженедельные покупки'
    );
    
    const freelance = account.addTransaction(
      TransactionType.INCOME,
      15000,
      'Фриланс',
      'Веб-разработка'
    );
    console.log();
    
    // Получение транзакций (сработает @LogMethod)
    console.log('Получение списка транзакций:');
    const transactions = account.getTransactions();
    console.log(`Всего транзакций: ${transactions.length}\n`);
    
    // Вывод сводки с метаданными
    console.log('Сводка счета:');
    console.log(account.getSummaryString());
    console.log();
    
    // Часть 2: Демонстрация декораторов на классе AccountManager
    console.log('\n2. ДЕМОНСТРАЦИЯ ДЕКОРАТОРОВ КЛАССА ACCOUNT MANAGER:\n');
    
    // Создание менеджера счетов (сработает @LogClass)
    console.log('Создание менеджера счетов:');
    const manager = new AccountManager();
    console.log('Менеджер счетов создан успешно!\n');
    
    // Добавление счетов (сработает @LogMethod)
    console.log('Добавление счетов:');
    const mainAccount = manager.addAccount('Основной счет', 50000);
    const savingsAccount = manager.addAccount('Накопительный счет', 100000);
    const businessAccount = manager.addAccount('Бизнес счет');
    console.log();
    
    // Добавление транзакций на разные счета
    console.log('Добавление транзакций на разные счета:');
    mainAccount.addTransaction(TransactionType.EXPENSE, 15000, 'Ипотека', 'Ежемесячный платеж');
    savingsAccount.addTransaction(TransactionType.INCOME, 20000, 'Дивиденды', 'Инвестиции');
    businessAccount.addTransaction(TransactionType.INCOME, 50000, 'Проект', 'Веб-сайт для клиента');
    businessAccount.addTransaction(TransactionType.EXPENSE, 10000, 'Оборудование', 'Новый ноутбук');
    console.log();
    
    // Получение счета по ID (сработает @LogMethod)
    console.log('Поиск счета по ID:');
    const foundAccount = manager.getAccountById(mainAccount.id);
    console.log(`Найден счет: ${foundAccount?.name}\n`);
    
    // Экспорт в CSV (сработает @LogMethod)
    console.log('Экспорт данных в CSV:');
    const csvData = manager.exportToCsv();
    console.log(`CSV данные (первые 500 символов):\n${csvData.substring(0, 500)}...\n`);
    
    // Общая сводка
    console.log('Общая сводка по всем счетам:');
    const overallSummary = manager.getOverallSummary();
    console.log(`
Общий баланс: ${overallSummary.balance.toFixed(2)} руб.
Общий доход: ${overallSummary.totalIncome.toFixed(2)} руб.
Общие расходы: ${overallSummary.totalExpense.toFixed(2)} руб.
Всего транзакций: ${overallSummary.transactionCount}
    `.trim());
    console.log();
    
    // Дополнительные функции
    console.log('Дополнительные функции:');
    console.log('Счета с отрицательным балансом:', 
      manager.getAccountsWithNegativeBalance().map(a => a.name).join(', ') || 'нет');
    
    console.log('Топ категорий по расходам:');
    const topCategories = manager.getTopCategories(3);
    topCategories.forEach((cat, index) => {
      console.log(`  ${index + 1}. ${cat.category}: ${cat.total.toFixed(2)} руб.`);
    });
    console.log();
    
    // Часть 3: Тестирование удаления транзакций и счетов
    console.log('\n3. ТЕСТИРОВАНИЕ УДАЛЕНИЯ:\n');
    
    // Удаление транзакции (сработает @LogMethod)
    console.log('Удаление транзакции:');
    const removed = account.removeTransactionById(groceries.id);
    console.log(`Транзакция удалена: ${removed}`);
    console.log(`Транзакций осталось: ${account.getTransactions().length}\n`);
    
    // Удаление счета (сработает @LogMethod)
    console.log('Удаление счета:');
    const accountRemoved = manager.removeAccount(businessAccount.id);
    console.log(`Счет удален: ${accountRemoved}`);
    console.log(`Счетов осталось: ${manager.accounts.length}\n`);
    
    // Финальная сводка
    console.log('\n4. ФИНАЛЬНАЯ СВОДКА:\n');
    console.log('Все счета:');
    manager.accounts.forEach((acc, index) => {
      console.log(`${index + 1}. ${acc.name}: ${acc.balance.toFixed(2)} руб. (${acc.getTransactions().length} транзакций)`);
    });
    
    console.log('\n' + '='.repeat(60));
    console.log('ДЕМОНСТРАЦИЯ ЗАВЕРШЕНА УСПЕШНО!');
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('\n' + '='.repeat(60));
    console.error('ПРОИЗОШЛА ОШИБКА:');
    console.error('='.repeat(60));
    console.error(error);
    
    if (error instanceof Error) {
      console.error(`Сообщение: ${error.message}`);
      console.error(`Стек вызовов: ${error.stack}`);
    }
  }
}

// Запуск демонстрации
if (require.main === module) {
  main().catch(console.error);
}

export { main };
