import { IAccount } from './IAccount';
import { ISummary } from './ISummary';

/**
 * Интерфейс менеджера счетов
 */
export interface IAccountManager {
  accounts: IAccount[];
  
  addAccount(name: string, initialBalance?: number): IAccount;
  
  removeAccount(id: string): boolean;
  
  getAccountById(id: string): IAccount | undefined;
  
  getTotalBalance(): number;
  
  getOverallSummary(): ISummary;
  
  exportToCsv(): string;
}
