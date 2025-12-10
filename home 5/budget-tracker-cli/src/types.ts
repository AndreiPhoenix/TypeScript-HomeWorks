// Интерфейс для транзакции
export interface ITransaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  date: string; // ISO строка
  description: string;
}

// Интерфейс для сводки по балансу
export interface ISummary {
  income: number;
  expenses: number;
  balance: number;
}

// Интерфейс для счёта
export interface IAccount {
  id: number;
  name: string;
  getSummary(): ISummary;
  getSummaryString(): string;
}

// Интерфейс для менеджера счетов
export interface IAccountManager {
  addAccount(account: IAccount): void;
  removeAccountById(accountId: number): boolean;
  getAccountById(id: number): IAccount | undefined;
  getAllAccounts(): IAccount[];
  getSummary(): ISummary;
  getSummaryString(): string;
}
