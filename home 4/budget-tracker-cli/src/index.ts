import { 
  ITransaction, 
  IAccount, 
  IAccountManager, 
  ISummary, 
  TransactionType 
} from './types';

// Реализация интерфейса IAccount
const createAccount = (id: number, name: string): IAccount => {
  let transactions: ITransaction[] = [];
  
  return {
    id,
    name,
    
    addTransaction(transaction: ITransaction): void {
      transactions.push(transaction);
    },
    
    removeTransactionById(transactionId: number): boolean {
      const initialLength = transactions.length;
      transactions = transactions.filter(t => t.id !== transactionId);
      return transactions.length < initialLength;
    },
    
    getTransactions(): ITransaction[] {
      return [...transactions]; // возвращаем копию для иммутабельности
    }
  };
};

// Реализация интерфейса IAccountManager
const createAccountManager = (): IAccountManager => {
  let accounts: IAccount[] = [];
  
  return {
    addAccount(account: IAccount): void {
      accounts.push(account);
    },
    
    removeAccountById(accountId: number): boolean {
      const initialLength = accounts.length;
      accounts = accounts.filter(a => a.id !== accountId);
      return accounts.length < initialLength;
    },
    
    getAccounts(): IAccount[] {
      return [...accounts]; // возвращаем копию для иммутабельности
    },
    
    getAccountById(id: number): IAccount | undefined {
      return accounts.find(account => account.id === id);
    },
    
    getSummary(accountId: number): ISummary {
      const account = this.getAccountById(accountId);
      if (!account) {
        throw new Error(`Account with id ${accountId} not found`);
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

// Демонстрация работы
console.log('=== Budget Tracker CLI Demo ===\n');

// Создаем менеджер счетов
const accountManager = createAccountManager();

// Создаем счет
const mainAccount = createAccount(1, "Основной счет");

// Добавляем транзакции
const transactions: ITransaction[] = [
  {
    id: 1,
    amount: 50000,
    type: "income",
    date: new Date().toISOString(),
    description: "Зарплата"
  },
  {
    id: 2,
    amount: 15000,
    type: "expense",
    date: new Date().toISOString(),
    description: "Аренда квартиры"
  },
  {
    id: 3,
    amount: 5000,
    type: "expense",
    date: new Date().toISOString(),
    description: "Продукты"
  },
  {
    id: 4,
    amount: 10000,
    type: "income",
    date: new Date().toISOString(),
    description: "Фриланс"
  }
];

// Добавляем транзакции в счет
transactions.forEach(transaction => {
  mainAccount.addTransaction(transaction);
});

// Добавляем счет в менеджер
accountManager.addAccount(mainAccount);

// Проверяем работу методов

// 1. Получаем все счета
console.log('1. Все счета:');
const accounts = accountManager.getAccounts();
accounts.forEach(account => {
  console.log(`   - ${account.name} (ID: ${account.id})`);
});

// 2. Получаем счет по ID
console.log('\n2. Поиск счета по ID:');
const foundAccount = accountManager.getAccountById(1);
if (foundAccount) {
  console.log(`   Найден счет: ${foundAccount.name}`);
}

// 3. Получаем транзакции счета
console.log('\n3. Транзакции счета:');
const accountTransactions = mainAccount.getTransactions();
accountTransactions.forEach(transaction => {
  const type = transaction.type === 'income' ? '+' : '-';
  console.log(`   ${type} ${transaction.amount} руб. - ${transaction.description}`);
});

// 4. Получаем сводную информацию
console.log('\n4. Сводная информация по счету:');
const summary = accountManager.getSummary(1);
console.log(`   Доходы: ${summary.income} руб.`);
console.log(`   Расходы: ${summary.expenses} руб.`);
console.log(`   Баланс: ${summary.balance} руб.`);

// 5. Тестируем удаление транзакции
console.log('\n5. Удаление транзакции:');
const removeResult = mainAccount.removeTransactionById(2);
console.log(`   Транзакция удалена: ${removeResult}`);

// 6. Проверяем сводную информацию после удаления
console.log('\n6. Сводная информация после удаления:');
const updatedSummary = accountManager.getSummary(1);
console.log(`   Доходы: ${updatedSummary.income} руб.`);
console.log(`   Расходы: ${updatedSummary.expenses} руб.`);
console.log(`   Баланс: ${updatedSummary.balance} руб.`);

// 7. Тестируем удаление счета
console.log('\n7. Удаление счета:');
const removeAccountResult = accountManager.removeAccountById(1);
console.log(`   Счет удален: ${removeAccountResult}`);
console.log(`   Осталось счетов: ${accountManager.getAccounts().length}`);

console.log('\n=== Демонстрация завершена ===');
