import { CategoryLimits } from '../interfaces/utility-types';
import { ITransaction } from '../interfaces/ITransaction';

export declare function checkCategoryLimits(
  transactions: ITransaction[],
  limits: CategoryLimits
): boolean;

export declare function filterTransactionsWithDescription(
  transactions: ITransaction[]
): ITransaction[];

export declare function createTransactionsPreview(
  transactions: ITransaction[]
): Array<{
  id: string;
  amount: number;
  type: import('../interfaces/TransactionType').TransactionType;
  date: Date;
}>;
