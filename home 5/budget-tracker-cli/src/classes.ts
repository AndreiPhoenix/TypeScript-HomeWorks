import { ITransaction, ISummary, IAccount, IAccountManager } from './types.js';

export class Transaction implements ITransaction {
  constructor(
    public id: number,
    public amount: number,
    public type: 'income' | 'expense',
    public date: string,
    public description: string
  ) {}

  toString(): string {
    const typeStr = this.type === 'income' ? 'ДОХОД' : 'РАСХОД';
    const date = new Date(this.date);
    const formattedDate = date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    
    return `Транзакция #${this.id}: [${typeStr}] ${this.amount} ₽, Дата: ${formattedDate}, Описание: ${this.description}`;
  }
}

export class Account implements IAccount, ISummary {
  public transactions: Transaction[] = [];

  constructor(
    public id: number,
    public name: string
  ) {}

  // Геттеры
  get income(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get expenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get balance(): number {
    return this.income - this.expenses;
  }

  // Методы
  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  getTransactions(): Transaction[] {
    return this.transactions;
  }

  getSummary(): ISummary {
    return {
      income: this.income,
      expenses: this.expenses,
      balance: this.balance
    };
  }

  getSummaryString(): string {
    return `${this.name} | Баланс: ${this.balance} ₽ | Транзакций: ${this.transactions.length}`;
  }

  toString(): string {
    if (this.transactions.length === 0) {
      return `Счёт "${this.name}" (ID: ${this.id})\nНет транзакций`;
    }

    const header = `╔══════╤════════════════════════════════════════════════════════════════════════╗\n` +
                  `║  ID  |                        ${this.name.padEnd(50)} ║\n` +
                  `╟──────┼───────────────────────────┬────────────────┬────────┬──────────────────╢\n` +
                  `║  id  |         описание          │ тип транзакции │ сумма  │      дата        ║\n` +
                  `╟──────┼───────────────────────────┼────────────────┼────────┼──────────────────╢`;

    const rows = this.transactions.map(transaction => {
      const typeStr = transaction.type === 'income' ? 'доход' : 'расход';
      const date = new Date(transaction.date);
      const formattedDate = date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      
      const id = transaction.id.toString().padEnd(4);
      const description = transaction.description.padEnd(25).substring(0, 25);
      const type = typeStr.padEnd(14);
      const amount = `${transaction.amount}₽`.padEnd(6);
      const dateStr = formattedDate.padEnd(16);

      return `║ ${id} │ ${description} │ ${type} │ ${amount} │ ${dateStr} ║`;
    }).join('\n');

    const footer = `╚══════╧═══════════════════════════╧════════════════╧════════╧══════════════════╝`;

    return `${header}\n${rows}\n${footer}`;
  }
}

export class AccountManager implements IAccountManager, ISummary {
  public accounts: Account[] = [];

  // Геттеры
  get income(): number {
    return this.accounts.reduce((sum, account) => sum + account.income, 0);
  }

  get expenses(): number {
    return this.accounts.reduce((sum, account) => sum + account.expenses, 0);
  }

  get balance(): number {
    return this.income - this.expenses;
  }

  // Методы
  addAccount(account: Account): void {
    this.accounts.push(account);
  }

  removeAccountById(accountId: number): boolean {
    const initialLength = this.accounts.length;
    this.accounts = this.accounts.filter(account => account.id !== accountId);
    return this.accounts.length < initialLength;
  }

  getAccountById(id: number): Account | undefined {
    return this.accounts.find(account => account.id === id);
  }

  getAllAccounts(): Account[] {
    return this.accounts;
  }

  getSummary(): ISummary {
    return {
      income: this.income,
      expenses: this.expenses,
      balance: this.balance
    };
  }

  getSummaryString(): string {
    return `Всего счетов: ${this.accounts.length} | Общий баланс: ${this.balance} ₽ | Доходы: ${this.income} ₽ | Расходы: ${this.expenses} ₽`;
  }

  toString(): string {
    if (this.accounts.length === 0) {
      return 'Нет доступных счетов';
    }

    let result = '╔══════════════════════════════════════════════════════════════════════════════╗\n';
    result += '║                         ОБЗОР ВСЕХ СЧЕТОВ                                      ║\n';
    result += '╟──────┬──────────────────────────────────┬──────────┬──────────┬───────────────╢\n';
    result += '║  ID  │           Название счёта         │  Баланс  │ Доходы   │  Расходы      ║\n';
    result += '╟──────┼──────────────────────────────────┼──────────┼──────────┼───────────────╢\n';

    this.accounts.forEach(account => {
      const id = account.id.toString().padEnd(4);
      const name = account.name.padEnd(32).substring(0, 32);
      const balance = `${account.balance}₽`.padEnd(8);
      const income = `${account.income}₽`.padEnd(8);
      const expenses = `${account.expenses}₽`.padEnd(13);

      result += `║ ${id} │ ${name} │ ${balance} │ ${income} │ ${expenses} ║\n`;
    });

    result += '╟──────┼──────────────────────────────────┼──────────┼──────────┼───────────────╢\n';
    
    const totalId = 'Итого'.padEnd(4);
    const totalName = ' '.padEnd(32);
    const totalBalance = `${this.balance}₽`.padEnd(8);
    const totalIncome = `${this.income}₽`.padEnd(8);
    const totalExpenses = `${this.expenses}₽`.padEnd(13);

    result += `║ ${totalId} │ ${totalName} │ ${totalBalance} │ ${totalIncome} │ ${totalExpenses} ║\n`;
    result += '╚══════╧══════════════════════════════════╧══════════╧══════════╧═══════════════╝';

    return result;
  }
}
