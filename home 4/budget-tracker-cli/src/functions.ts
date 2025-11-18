import { 
  ITransaction, 
  IAccount, 
  IAccountManager, 
  ISummary, 
  TransactionType 
} from './types';

// Вспомогательные функции для работы с транзакциями
export const createTransaction = (
  id: number, 
  amount: number, 
  type: TransactionType, 
  description: string
): ITransaction => {
  return {
    id,
    amount,
    type,
    date: new Date().toISOString(),
    description
  };
};

// Функция для создания счета
export const createAccount = (id: number, name: string): IAccount => {
  let transactions: ITransaction[] = [];
  
  return {
    id,
    name,
    
    addTransaction(transaction: ITransaction): void {
      // Проверяем, нет ли уже транзакции с таким ID
      const existingTransaction = transactions.find(t => t.id === transaction.id);
      if (!existingTransaction) {
        transactions.push(transaction);
        console.log(`Транзакция "${transaction.description}" добавлена на счет "${this.name}"`);
      } else {
        console.log(`Транзакция с ID ${transaction.id} уже существует`);
      }
    },
    
    removeTransactionById(transactionId: number): boolean {
      const initialLength = transactions.length;
      transactions = transactions.filter(t => t.id !== transactionId);
      const removed = transactions.length < initialLength;
      
      if (removed) {
        console.log(`Транзакция с ID ${transactionId} удалена из счета "${this.name}"`);
      } else {
        console.log(`Транзакция с ID ${transactionId} не найдена на счете "${this.name}"`);
      }
      
      return removed;
    },
    
    getTransactions(): ITransaction[] {
      return [...transactions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  };
};

// Функция для создания менеджера счетов
export const createAccountManager = (): IAccountManager => {
  let accounts: IAccount[] = [];
  
  return {
    addAccount(account: IAccount): void {
      // Проверяем, нет ли уже счета с таким ID
      const existingAccount = accounts.find(a => a.id === account.id);
      if (!existingAccount) {
        accounts.push(account);
        console.log(`Счет "${account.name}" добавлен в менеджер`);
      } else {
        console.log(`Счет с ID ${account.id} уже существует`);
      }
    },
    
    removeAccountById(accountId: number): boolean {
      const accountToRemove = accounts.find(a => a.id === accountId);
      const initialLength = accounts.length;
      accounts = accounts.filter(a => a.id !== accountId);
      const removed = accounts.length < initialLength;
      
      if (removed && accountToRemove) {
        console.log(`Счет "${accountToRemove.name}" удален из менеджера`);
      } else {
        console.log(`Счет с ID ${accountId} не найден`);
      }
      
      return removed;
    },
    
    getAccounts(): IAccount[] {
      return [...accounts];
    },
    
    getAccountById(id: number): IAccount | undefined {
      return accounts.find(account => account.id === id);
    },
    
    getSummary(accountId: number): ISummary {
      const account = this.getAccountById(accountId);
      if (!account) {
        throw new Error(`Счет с ID ${accountId} не найден`);
      }
      
      const transactions = account.getTransactions();
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const balance = income - expenses;
      
      return { income, expenses, balance };
    }
  };
};

// Функция для форматирования вывода сводки
export const formatSummary = (summary: ISummary): string => {
  return `
📊 Сводная информация:
   💰 Доходы: ${summary.income} руб.
   💸 Расходы: ${summary.expenses} руб.
   ⚖️  Баланс: ${summary.balance} руб.
  `;
};

// Функция для вывода транзакций
export const printTransactions = (transactions: ITransaction[]): void => {
  if (transactions.length === 0) {
    console.log("   Нет транзакций");
    return;
  }
  
  transactions.forEach(transaction => {
    const typeIcon = transaction.type === 'income' ? '➕' : '➖';
    const date = new Date(transaction.date).toLocaleDateString();
    console.log(`   ${typeIcon} ${transaction.amount} руб. - ${transaction.description} (${date})`);
  });
};
