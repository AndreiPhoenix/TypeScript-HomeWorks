export type PartialAccount = {
  id: string;
  name: string;
  balance: number;
};

export type TransactionFilters = {
  startDate?: Date;
  endDate?: Date;
  minAmount?: number;
  maxAmount?: number;
  type?: 'income' | 'expense';
};
