import { IAccountManager } from "../interfaces/IAccountManager.js";
import { IAccount } from "../interfaces/IAccount.js";
import { ITransaction } from "../interfaces/ITransaction.js";
import { formatCurrency } from "formatCurrency.js";

export class AccountManager implements IAccountManager {
  accounts: IAccount[] = [];

  addAccount(account: IAccount): void {
    this.accounts.push(account);
    console.log(`Account "${account.name}" added with ID: ${account.id}`);
  }

  removeAccount(id: string): void {
    const index = this.accounts.findIndex((account) => account.id === id);
    if (index !== -1) {
      const account = this.accounts[index];
      this.accounts.splice(index, 1);
      console.log(`Account "${account.name}" removed.`);
    } else {
      console.log(`Account with ID ${id} not found.`);
    }
  }

  getAccount(id: string): IAccount | undefined {
    return this.accounts.find((account) => account.id === id);
  }

  getTotalBalance(): number {
    return this.accounts.reduce(
      (total, account) => total + account.getBalance(),
      0
    );
  }

  getFormattedTotalBalance(): string {
    return formatCurrency(this.getTotalBalance());
  }

  getAllTransactions(): ITransaction[] {
    return this.accounts.flatMap((account) => account.transactions);
  }

  getAccountSummary(): string {
    if (this.accounts.length === 0) {
      return "No accounts available.";
    }

    let summary = "=== Account Manager Summary ===\n";
    summary += `Total Accounts: ${this.accounts.length}\n`;
    summary += `Total Balance: ${this.getFormattedTotalBalance()}\n\n`;

    this.accounts.forEach((account) => {
      const accountSummary = account.getSummary();
      summary += `Account: ${account.name}\n`;
      summary += `  Balance: ${formatCurrency(accountSummary.balance)}\n`;
      summary += `  Transactions: ${accountSummary.transactionCount}\n`;
      summary += `  Income: ${formatCurrency(accountSummary.totalIncome)}\n`;
      summary += `  Expenses: ${formatCurrency(accountSummary.totalExpenses)}\n`;
      summary += `  ID: ${account.id}\n\n`;
    });

    return summary;
  }
}
