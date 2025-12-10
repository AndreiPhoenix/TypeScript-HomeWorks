import { Transaction, Account } from './classes';
import { ITransaction, ISummary } from './types';

// Вспомогательные функции для работы с финансами

/**
 * Создаёт транзакцию с текущей датой
 */
export function createTransaction(
  id: number,
  amount: number,
  type: 'income' | 'expense',
  description: string
): Transaction {
  const date = new Date().toISOString().split('T')[0]; // Только дата YYYY-MM-DD
  return new Transaction(id, amount, type, date, description);
}

/**
 * Проверяет, является ли транзакция валидной
 */
export function isValidTransaction(transaction: ITransaction): boolean {
  return (
    transaction.id > 0 &&
    transaction.amount > 0 &&
    ['income', 'expense'].includes(transaction.type) &&
    !isNaN(Date.parse(transaction.date)) &&
    transaction.description.trim().length > 0
  );
}

/**
 * Рассчитывает баланс из массива транзакций
 */
export function calculateBalance(transactions: ITransaction[]): number {
  return transactions.reduce((balance, transaction) => {
    return transaction.type === 'income' 
      ? balance + transaction.amount 
      : balance - transaction.amount;
  }, 0);
}

/**
 * Рассчитывает сводку из массива транзакций
 */
export function calculateSummary(transactions: ITransaction[]): ISummary {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  return {
    income,
    expenses,
    balance: income - expenses
  };
}

/**
 * Форматирует денежную сумму
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 2
  }).format(amount);
}

/**
 * Группирует транзакции по месяцам
 */
export function groupTransactionsByMonth(transactions: ITransaction[]): Map<string, ITransaction[]> {
  const groups = new Map<string, ITransaction[]>();
  
  transactions.forEach(transaction => {
    const date = new Date(transaction.date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    if (!groups.has(monthKey)) {
      groups.set(monthKey, []);
    }
    
    groups.get(monthKey)!.push(transaction);
  });
  
  return groups;
}

/**
 * Возвращает статистику по транзакциям за период
 */
export function getTransactionsStats(
  transactions: ITransaction[], 
  startDate?: Date, 
  endDate?: Date
): {
  count: number;
  totalIncome: number;
  totalExpenses: number;
  averageTransaction: number;
  largestIncome: number;
  largestExpense: number;
} {
  let filteredTransactions = [...transactions];
  
  if (startDate) {
    filteredTransactions = filteredTransactions.filter(t => new Date(t.date) >= startDate);
  }
  
  if (endDate) {
    filteredTransactions = filteredTransactions.filter(t => new Date(t.date) <= endDate);
  }
  
  const incomes = filteredTransactions.filter(t => t.type === 'income');
  const expenses = filteredTransactions.filter(t => t.type === 'expense');
  
  const totalIncome = incomes.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  
  const largestIncome = incomes.length > 0 
    ? Math.max(...incomes.map(t => t.amount))
    : 0;
    
  const largestExpense = expenses.length > 0 
    ? Math.max(...expenses.map(t => t.amount))
    : 0;
    
  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction = filteredTransactions.length > 0 
    ? totalAmount / filteredTransactions.length 
    : 0;
  
  return {
    count: filteredTransactions.length,
    totalIncome,
    totalExpenses,
    averageTransaction,
    largestIncome,
    largestExpense
  };
}

/**
 * Сравнивает два счета по балансу
 */
export function compareAccountsByBalance(account1: Account, account2: Account): number {
  return account2.balance - account1.balance;
}

/**
 * Фильтрует транзакции по описанию
 */
export function filterTransactionsByKeyword(
  transactions: ITransaction[], 
  keyword: string
): ITransaction[] {
  const lowerKeyword = keyword.toLowerCase();
  return transactions.filter(t => 
    t.description.toLowerCase().includes(lowerKeyword)
  );
}

/**
 * Экспортирует данные счета в CSV формат
 */
export function exportAccountToCSV(account: Account): string {
  const headers = ['ID', 'Дата', 'Тип', 'Сумма', 'Описание'];
  const rows = account.transactions.map(t => [
    t.id.toString(),
    t.date,
    t.type,
    t.amount.toString(),
    t.description
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
}
