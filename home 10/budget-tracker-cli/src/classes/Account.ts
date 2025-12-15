import { Transaction } from './Transaction';
import { ITransaction, TransactionType } from '../interfaces';
import fs from 'fs/promises';
import path from 'path';
import { escapeCsvValue } from '../utils/escapeCsvValue';

export class Account {
    private balance: number = 0;
    private transactions: Transaction[] = [];
    private readonly id: string;

    constructor(initialBalance: number = 0, id: string = Date.now().toString()) {
        this.balance = initialBalance;
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public getBalance(): number {
        return this.balance;
    }

    public getTransactions(): Transaction[] {
        return [...this.transactions];
    }

    public addTransaction(transaction: Transaction): void {
        if (transaction.type === TransactionType.INCOME) {
            this.balance += transaction.amount;
        } else if (transaction.type === TransactionType.EXPENSE) {
            this.balance -= transaction.amount;
        }

        this.transactions.push(transaction);
    }

    public removeTransaction(transactionId: string): boolean {
        const index = this.transactions.findIndex(t => t.getId() === transactionId);
        
        if (index !== -1) {
            const transaction = this.transactions[index];
            
            // Отменяем влияние транзакции на баланс
            if (transaction.type === TransactionType.INCOME) {
                this.balance -= transaction.amount;
            } else if (transaction.type === TransactionType.EXPENSE) {
                this.balance += transaction.amount;
            }

            this.transactions.splice(index, 1);
            return true;
        }

        return false;
    }

    /**
     * Асинхронный метод для экспорта транзакций в CSV-файл
     * @param filename - имя файла для экспорта
     * @returns Promise<void>, который разрешается при успешной записи файла
     * @throws {Error} - выбрасывает исключение при ошибке записи файла
     */
    public async exportTransactionsToCSV(filename: string): Promise<void> {
        try {
            // Формируем заголовки CSV
            const headers = ['id', 'amount', 'type', 'date', 'description'];
            const headerRow = headers.join(',');
            
            // Формируем строки с данными транзакций
            const dataRows = this.transactions.map(transaction => {
                const rowData = [
                    escapeCsvValue(transaction.getId()),
                    escapeCsvValue(transaction.amount),
                    escapeCsvValue(transaction.type),
                    escapeCsvValue(transaction.date.toISOString()),
                    escapeCsvValue(transaction.description)
                ];
                return rowData.join(',');
            });
            
            // Объединяем все строки
            const csvContent = [headerRow, ...dataRows].join('\n');
            
            // Создаем полный путь к файлу
            const filePath = path.resolve(process.cwd(), filename);
            
            // Асинхронно записываем файл
            await fs.writeFile(filePath, csvContent, 'utf-8');
            
            console.log(`✅ Файл успешно экспортирован: ${filePath}`);
            console.log(`📊 Количество транзакций: ${this.transactions.length}`);
            
        } catch (error) {
            // Обработка ошибок записи файла
            if (error instanceof Error) {
                throw new Error(`Ошибка при экспорте в CSV: ${error.message}`);
            } else {
                throw new Error('Неизвестная ошибка при экспорте в CSV');
            }
        }
    }
}
