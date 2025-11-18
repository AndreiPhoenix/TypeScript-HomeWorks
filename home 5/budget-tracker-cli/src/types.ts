export interface ITransaction {
  id: number;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  description: string;
}

export interface ISummary {
  income: number;
  expenses: number;
  balance: number;
}

export interface IAccount {
  id: number;
  name: string;
  transactions: ITransaction[];
}

export interface IAccountManager {
  accounts: IAccount[];
  addAccount(account: Account): void;
  removeAccountById(accountId: number): boolean;
  getAccountById(id: number): Account | undefined;
  getAllAccounts(): Account[];
  getSummary(): ISummary;
  getSummaryString(): string;
}
