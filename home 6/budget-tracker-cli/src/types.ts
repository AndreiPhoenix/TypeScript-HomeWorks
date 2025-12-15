// Базовые типы для проекта Budget Tracker

// Тип для категории расходов/доходов
export type Category = {
    id: number;
    name: string;
    type: 'expense' | 'income';
}

// Тип для транзакции
export type Transaction = {
    id: number;
    amount: number;
    category: Category;
    description: string;
    date: Date;
}

// Тип для отчета
export type Report = {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
    transactions: Transaction[];
}

// Перечисление для валют
export enum Currency {
    USD = 'USD',
    EUR = 'EUR',
    RUB = 'RUB',
    CNY = 'CNY'
}
