// Утилитные функции для работы с финансами

/**
 * Форматирует число как денежную сумму
 * @param amount - сумма для форматирования
 * @param currency - валюта (по умолчанию USD)
 * @returns отформатированная строка
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

/**
 * Рассчитывает общий баланс на основе массива транзакций
 * @param transactions - массив транзакций
 * @returns объект с итоговыми значениями
 */
export function calculateBalance(transactions: any[]): { income: number; expenses: number; balance: number } {
    const result = {
        income: 0,
        expenses: 0,
        balance: 0
    };

    transactions.forEach(transaction => {
        if (transaction.amount > 0) {
            result.income += transaction.amount;
        } else {
            result.expenses += Math.abs(transaction.amount);
        }
    });

    result.balance = result.income - result.expenses;
    return result;
}

/**
 * Фильтрует транзакции по категории
 * @param transactions - массив транзакций
 * @param categoryId - ID категории для фильтрации
 * @returns отфильтрованный массив транзакций
 */
export function filterByCategory(transactions: any[], categoryId: number): any[] {
    return transactions.filter(transaction => 
        transaction.category && transaction.category.id === categoryId
    );
}

/**
 * Группирует транзакции по дате
 * @param transactions - массив транзакций
 * @returns объект с транзакциями, сгруппированными по дате
 */
export function groupByDate(transactions: any[]): Record<string, any[]> {
    return transactions.reduce((groups, transaction) => {
        const date = transaction.date.toISOString().split('T')[0];
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(transaction);
        return groups;
    }, {} as Record<string, any[]>);
}
