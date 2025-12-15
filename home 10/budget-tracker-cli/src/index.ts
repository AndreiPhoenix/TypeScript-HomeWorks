import { Account } from './classes/Account';
import { Transaction } from './classes/Transaction';
import { TransactionType } from './interfaces/TransactionType';

async function main() {
    console.log('💰 Budget Tracker CLI - Экспорт в CSV\n');

    // Создаем аккаунт с начальным балансом
    const account = new Account(1000);
    console.log(`Создан аккаунт с балансом: ${account.getBalance()} руб.\n`);

    // Добавляем тестовые транзакции
    const transactions = [
        new Transaction(500, TransactionType.INCOME, 'Зарплата'),
        new Transaction(150, TransactionType.EXPENSE, 'Продукты'),
        new Transaction(300, TransactionType.EXPENSE, 'Ресторан "Вкусная еда"'),
        new Transaction(200, TransactionType.INCOME, 'Фриланс'),
        new Transaction(100, TransactionType.EXPENSE, 'Кофе с печенькой, книга')
    ];

    transactions.forEach(transaction => {
        account.addTransaction(transaction);
        const typeSymbol = transaction.type === TransactionType.INCOME ? '➕' : '➖';
        console.log(`${typeSymbol} Добавлена транзакция: ${transaction.description} (${transaction.amount} руб.)`);
    });

    console.log(`\n📈 Итоговый баланс: ${account.getBalance()} руб.`);
    console.log(`📋 Количество транзакций: ${account.getTransactions().length}\n`);

    // Экспорт транзакций в CSV файл
    try {
        console.log('🔄 Начинаем экспорт транзакций в CSV...');
        
        // Используем асинхронный метод exportTransactionsToCSV
        await account.exportTransactionsToCSV('transactions.csv');
        
        // Демонстрация обработки ошибок
        console.log('\n🔄 Пробуем экспорт в защищенную директорию (ожидаем ошибку)...');
        try {
            // Попытка записи в системную директорию (скорее всего, вызовет ошибку)
            await account.exportTransactionsToCSV('/root/transactions.csv');
        } catch (error) {
            if (error instanceof Error) {
                console.log(`❌ Ожидаемая ошибка: ${error.message}`);
            }
        }

    } catch (error) {
        if (error instanceof Error) {
            console.error(`❌ Ошибка при экспорте: ${error.message}`);
        } else {
            console.error('❌ Неизвестная ошибка при экспорте');
        }
    }

    // Демонстрация экспорта с разными данными
    console.log('\n--- Дополнительные тесты ---');
    
    // Создаем аккаунт с транзакциями, содержащими специальные символы
    const testAccount = new Account();
    
    const specialTransactions = [
        new Transaction(100, TransactionType.INCOME, 'Оплата с запятой, и кавычками "test"'),
        new Transaction(50, TransactionType.EXPENSE, 'Покупка\nс переносом строки'),
        new Transaction(75, TransactionType.EXPENSE, 'Кафе "Кофе & Чай"')
    ];
    
    specialTransactions.forEach(t => testAccount.addTransaction(t));
    
    try {
        await testAccount.exportTransactionsToCSV('special_transactions.csv');
        console.log('✅ Успешно экспортированы транзакции со специальными символами');
    } catch (error) {
        if (error instanceof Error) {
            console.error(`❌ Ошибка: ${error.message}`);
        }
    }
}

// Обработка необработанных исключений
process.on('unhandledRejection', (reason, promise) => {
    console.error('⚠️ Необработанное исключение в Promise:', reason);
});

// Запуск приложения
main().catch(error => {
    console.error('⚠️ Критическая ошибка приложения:', error);
    process.exit(1);
});
