import { formatCurrency } from './functions';

// Базовый класс для финансовой операции
export abstract class FinancialOperation {
    constructor(
        protected id: number,
        protected amount: number,
        protected description: string,
        protected date: Date = new Date()
    ) {}

    abstract getDetails(): string;

    getId(): number {
        return this.id;
    }

    getAmount(): number {
        return this.amount;
    }

    getDescription(): string {
        return this.description;
    }

    getDate(): Date {
        return this.date;
    }
}

// Класс для расхода
export class Expense extends FinancialOperation {
    constructor(
        id: number,
        amount: number,
        description: string,
        private category: string,
        date?: Date
    ) {
        super(id, -Math.abs(amount), description, date);
    }

    getDetails(): string {
        return `Расход: ${this.description} | Категория: ${this.category} | Сумма: ${formatCurrency(this.amount)} | Дата: ${this.date.toLocaleDateString()}`;
    }

    getCategory(): string {
        return this.category;
    }
}

// Класс для дохода
export class Income extends FinancialOperation {
    constructor(
        id: number,
        amount: number,
        description: string,
        private source: string,
        date?: Date
    ) {
        super(id, Math.abs(amount), description, date);
    }

    getDetails(): string {
        return `Доход: ${this.description} | Источник: ${this.source} | Сумма: ${formatCurrency(this.amount)} | Дата: ${this.date.toLocaleDateString()}`;
    }

    getSource(): string {
        return this.source;
    }
}

// Класс для управления бюджетом
export class BudgetManager {
    private operations: FinancialOperation[] = [];

    addOperation(operation: FinancialOperation): void {
        this.operations.push(operation);
    }

    removeOperation(id: number): boolean {
        const initialLength = this.operations.length;
        this.operations = this.operations.filter(op => op.getId() !== id);
        return this.operations.length < initialLength;
    }

    getOperationById(id: number): FinancialOperation | undefined {
        return this.operations.find(op => op.getId() === id);
    }

    getAllOperations(): FinancialOperation[] {
        return [...this.operations];
    }

    getTotalBalance(): number {
        return this.operations.reduce((total, op) => total + op.getAmount(), 0);
    }

    getOperationsByType(type: 'income' | 'expense'): FinancialOperation[] {
        return this.operations.filter(op => 
            (type === 'income' && op.getAmount() > 0) ||
            (type === 'expense' && op.getAmount() < 0)
        );
    }

    generateReport(): string {
        const totalIncome = this.getOperationsByType('income')
            .reduce((sum, op) => sum + op.getAmount(), 0);
        
        const totalExpenses = Math.abs(this.getOperationsByType('expense')
            .reduce((sum, op) => sum + op.getAmount(), 0));
        
        const balance = this.getTotalBalance();

        return `
        === Финансовый отчет ===
        Общий доход: ${formatCurrency(totalIncome)}
        Общие расходы: ${formatCurrency(totalExpenses)}
        Баланс: ${formatCurrency(balance)}
        Всего операций: ${this.operations.length}
        =======================
        `;
    }
}
