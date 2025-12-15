import { Transaction } from '../classes/Transaction';

export interface IAccount {
    getId(): string;
    getBalance(): number;
    getTransactions(): Transaction[];
    addTransaction(transaction: Transaction): void;
    removeTransaction(transactionId: string): boolean;
    exportTransactionsToCSV(filename: string): Promise<void>;
}
