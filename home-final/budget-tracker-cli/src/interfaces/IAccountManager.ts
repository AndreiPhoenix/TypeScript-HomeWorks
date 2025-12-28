import { IAccount } from './IAccount';

export interface IAccountManager {
  accounts: IAccount[];
  addAccount(account: IAccount): void;
  removeAccount(id: string): void;
  getAccount(id: string): IAccount | undefined;
  getAccountByName(name: string): IAccount | undefined;
}
