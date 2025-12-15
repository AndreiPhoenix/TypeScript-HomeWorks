/// <reference path="./ITransaction.ts" />
/// <reference path="./ISummary.ts" />

namespace BudgetTracker {
  export interface IAccount {
    id: number;
    name: string;
    
    addTransaction(transaction: ITransaction): void;
    getTransactions(): ITransaction[];
    getTransactionById(id: number): ITransaction | undefined;
    getSummary(): ISummary;
    toString(): string;
  }
}
