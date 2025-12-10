import { 
  ITransaction, 
  ISummary, 
  IAccount, 
  IAccountManager 
} from './types';

export class Transaction implements ITransaction {
  constructor(
    public id: number,
    public amount: number,
    public type: 'income' | 'expense',
    public date: string,
    public description: string
  ) {}

  toString(): string {
    const sign = this.type === 'income' ? '+' : '-';
    const formattedAmount = `${sign}${this.amount.toFixed(2)}`;
    const date = new Date(this.date).toLocaleDateString('ru-RU');
    
    return `[${date}] ${this.description}: ${formattedAmount} (ID: ${this.id})`;
  }
}

export class Account implements IAccount, ISummary {
  public transactions: Transaction[] = [];

  constructor(
    public id: number,
    public name: string
  ) {}

  // Геттер для общей суммы доходов
  get income(): number {
    return this.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Геттер для общей суммы расходов
  get expenses(): number {
    return this.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }

  // Геттер для текущего баланса
  get balance(): number {
    return this.income - this.expenses;
  }

  // Метод для добавления транзакции
  addTransaction(transaction: Transaction): void {
    this.transactions.push(transaction);
  }

  // Метод для получения сводки
  getSummary(): ISummary {
    return {
      income: this.income,
      expenses: this.expenses,
      balance: this.balance
    };
  }

  // Метод для получения строки сводки
  getSummaryString(): string {
    const summary = this.getSummary();
    return `${this.name}: Баланс: ${summary.balance.toFixed(2)}, ` +
           `Доходы: ${summary.income.toFixed(2)}, ` +
           `Расходы: ${summary.expenses.toFixed(2)}, ` +
           `Транзакций: ${this.transactions.length}`;
  }

  // Метод для строкового представления счёта
  toString(): string {
    const summary = this.getSummary();
    const transactionCount = this.transactions.length;
    
    let result = `=== Счёт: ${this.name} ===\n`;
    result += `ID: ${this.id}\n`;
    result += `Баланс: ${summary.balance.toFixed(2)}\n`;
    result += `Доходы: ${summary.income.toFixed(2)}\n`;
    result += `Расходы: ${summary.expenses.toFixed(2)}\n`;
    result += `Количество транзакций: ${transactionCount}\n`;
    
    if (transactionCount > 0) {
      result += `\nПоследние транзакции:\n`;
      const recentTransactions = this.transactions.slice(-5);
      recentTransactions.forEach(transaction => {
        result += `  ${transaction.toString()}\n`;
      });
    }
    
    return result;
  }
}

export class AccountManager implements IAccountManager, ISummary {
  public accounts: Account[] = [];

  // Геттер для общей суммы доходов по всем счетам
  get income(): number {
    return this.accounts.reduce((sum, account) => sum + account.income, 0);
  }

  // Геттер для общей суммы расходов по всем счетам
  get expenses(): number {
    return this.accounts.reduce((sum, account) => sum + account.expenses, 0);
  }

  // Геттер для общего баланса по всем счетам
  get balance(): number {
    return this.accounts.reduce((sum, account) => sum + account.balance, 0);
  }

  // Метод для добавления счёта
  addAccount(account: Account): void {
    this.accounts.push(account);
  }

  // Метод для удаления счёта по ID
  removeAccountById(accountId: number): boolean {
    const initialLength = this.accounts.length;
    this.accounts = this.accounts.filter(account => account.id !== accountId);
    return this.accounts.length < initialLength;
  }

  // Метод для получения счёта по ID
  getAccountById(id: number): Account | undefined {
    return this.accounts.find(account => account.id === id);
  }

  // Метод для получения всех счетов
  getAllAccounts(): Account[] {
    return [...this.accounts];
  }

  // Метод для получения сводки по всем счетам
  getSummary(): ISummary {
    return {
      income: this.income,
      expenses: this.expenses,
      balance: this.balance
    };
  }

  // Метод для получения строки сводки
  getSummaryString(): string {
    const summary = this.getSummary();
    return `Общая сводка: Счетов: ${this.accounts.length}, ` +
           `Баланс: ${summary.balance.toFixed(2)}, ` +
           `Доходы: ${summary.income.toFixed(2)}, ` +
           `Расходы: ${summary.expenses.toFixed(2)}`;
  }

  // Метод для строкового представления менеджера счетов
  toString(): string {
    const summary = this.getSummary();
    const accountCount = this.accounts.length;
    
    let result = '=== Учёт бюджета ===\n\n';
    result += `Общая статистика:\n`;
    result += `  Всего счетов: ${accountCount}\n`;
    result += `  Общий баланс: ${summary.balance.toFixed(2)}\n`;
    result += `  Общие доходы: ${summary.income.toFixed(2)}\n`;
    result += `  Общие расходы: ${summary.expenses.toFixed(2)}\n\n`;
    
    if (accountCount > 0) {
      result += `Детали по счетам:\n`;
      this.accounts.forEach(account => {
        result += `  - ${account.getSummaryString()}\n`;
      });
    } else {
      result += `Счета не добавлены.\n`;
    }
    
    return result;
  }
}
