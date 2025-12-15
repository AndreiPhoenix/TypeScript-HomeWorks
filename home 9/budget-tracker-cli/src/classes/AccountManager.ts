import { IAccountManager } from '../interfaces/IAccountManager';
import { IAccount } from '../interfaces/IAccount';
import { ITransaction } from '../interfaces/ITransaction';
import { Account } from './Account';

export class AccountManager implements IAccountManager {
  private accounts: IAccount[] = [];

  createAccount(name: string): IAccount {
    const account = new Account(name);
    this.accounts.push(account);
    return account;
  }

  getAccount(id: string): IAccount | undefined {
    return this.accounts.find(account => account.id === id);
  }

  getAllAccounts(): IAccount[] {
    return [...this.accounts];
  }

  addTransaction(accountId: string, transaction: ITransaction): void {
    const account = this.getAccount(accountId);
    if (account) {
      account.addTransaction(transaction);
    }
  }

  removeTransaction(accountId: string, transactionId: string): void {
    const account = this.getAccount(accountId);
    if (account) {
      account.removeTransaction(transactionId);
    }
  }

  getAccountSummary(accountId: string) {
    const account = this.getAccount(accountId);
    if (!account) {
      throw new Error('Account not found');
    }
    return account.getSummary();
  }
}
