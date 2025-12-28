import { IAccountManager } from '../interfaces/IAccountManager';
import { IAccount } from '../interfaces/IAccount';
import { Account } from './Account';

export class AccountManager implements IAccountManager {
  public accounts: IAccount[] = [];

  addAccount(account: IAccount): void {
    this.accounts.push(account);
  }

  removeAccount(id: string): void {
    const index = this.accounts.findIndex(account => account.id === id);
    if (index !== -1) {
      this.accounts.splice(index, 1);
    }
  }

  getAccount(id: string): IAccount | undefined {
    return this.accounts.find(account => account.id === id);
  }

  getAccountByName(name: string): IAccount | undefined {
    return this.accounts.find(account => account.name === name);
  }

  getAllAccountsSummary(): string {
    if (this.accounts.length === 0) {
      return 'Нет доступных счетов';
    }

    return this.accounts
      .map(account => `${account.name}: $${account.balance} (${account.transactions.length} транзакций)`)
      .join('\n');
  }
}
