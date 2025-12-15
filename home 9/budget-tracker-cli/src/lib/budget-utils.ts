import { CategoryLimits } from '../interfaces/utility-types';
import { ITransaction } from '../interfaces/ITransaction';

// Функция для проверки лимитов
export function checkCategoryLimits(
  transactions: ITransaction[],
  limits: CategoryLimits
): boolean {
  const categoryTotals: Record<string, number> = { income: 0, expense: 0 };
  
  transactions.forEach(transaction => {
    categoryTotals[transaction.type] += transaction.amount;
  });
  
  return categoryTotals.income <= limits.income && 
         categoryTotals.expense <= limits.expense;
}

// Функция для фильтрации null описаний
export function filterTransactionsWithDescription(
  transactions: ITransaction[]
): ITransaction[] {
  return transactions.filter(transaction => 
    transaction.description && transaction.description.trim() !== ''
  );
}

// Функция для создания preview транзакций
export function createTransactionsPreview(
  transactions: ITransaction[]
) {
  return transactions.map(transaction => {
    const { id, amount, type, date } = transaction;
    return { id, amount, type, date };
  });
}
