/// <reference path="../interfaces/IAccountManager.ts" />
/// <reference path="../interfaces/IAccount.ts" />

namespace BudgetTracker {
  export class AccountManager implements IAccountManager {
    public accounts: IAccount[] = [];
    
    addAccount(account: IAccount): void {
      this.accounts.push(account);
    }
    
    getAccountById(id: number): IAccount | undefined {
      return this.accounts.find(account => account.id === id);
    }
    
    getTotalBalance(): number {
      return this.accounts.reduce((total, account) => {
        const summary = account.getSummary();
        return total + summary.balance;
      }, 0);
    }
    
    get balance(): number {
      return this.getTotalBalance();
    }
  }
}
