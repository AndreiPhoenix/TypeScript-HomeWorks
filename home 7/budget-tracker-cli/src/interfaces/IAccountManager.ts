/// <reference path="./IAccount.ts" />

namespace BudgetTracker {
  export interface IAccountManager {
    accounts: IAccount[];
    
    addAccount(account: IAccount): void;
    getAccountById(id: number): IAccount | undefined;
    getTotalBalance(): number;
  }
}
