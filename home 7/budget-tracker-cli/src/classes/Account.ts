/// <reference path="../interfaces/IAccount.ts" />
/// <reference path="../interfaces/ITransaction.ts" />
/// <reference path="../interfaces/ISummary.ts" />

namespace BudgetTracker {
  export class Account implements IAccount {
    private transactions: ITransaction[] = [];
    
    constructor(
      public id: number,
      public name: string
    ) {}
    
    addTransaction(transaction: ITransaction): void {
      this.transactions.push(transaction);
    }
    
    getTransactions(): ITransaction[] {
      return [...this.transactions];
    }
    
    getTransactionById(id: number): ITransaction | undefined {
      return this.transactions.find(t => t.id === id);
    }
    
    getSummary(): ISummary {
      const totalIncome = this.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      
      const totalExpense = this.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
      
      return {
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      };
    }
    
    toString(): string {
      const summary = this.getSummary();
      return `Бюджет: ${this.name} (ID: ${this.id})
Баланс: ${summary.balance} ₽
Доходы: ${summary.totalIncome} ₽
Расходы: ${summary.totalExpense} ₽
Количество транзакций: ${this.transactions.length}`;
    }
  }
}
