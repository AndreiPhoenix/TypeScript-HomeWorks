/// <reference path="../interfaces/ITransaction.ts" />
/// <reference path="../interfaces/TransactionType.ts" />

namespace BudgetTracker {
  export class Transaction implements ITransaction {
    constructor(
      public id: number,
      public amount: number,
      public type: TransactionType,
      public date: string,
      public description: string
    ) {
      if (amount <= 0) {
        throw new Error('Сумма должна быть положительным числом');
      }
    }
    
    toString(): string {
      const typeStr = this.type === 'income' ? 'Доход' : 'Расход';
      const dateObj = new Date(this.date);
      const formattedDate = dateObj.toLocaleDateString('ru-RU');
      return `[${this.id}] ${typeStr}: ${this.amount} ₽ (${formattedDate}) - ${this.description}`;
    }
  }
}
