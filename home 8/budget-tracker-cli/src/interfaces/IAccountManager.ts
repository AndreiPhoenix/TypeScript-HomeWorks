import { IAccount } from "./IAccount.js";

export interface IAccountManager {
  accounts: IAccount[];
  addAccount(account: IAccount): void;
  removeAccount(id: string): void;
  getAccount(id: string): IAccount | undefined;
  getTotalBalance(): number;
  getAllTransactions(): ITransaction[];
}
