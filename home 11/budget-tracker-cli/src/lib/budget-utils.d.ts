declare module './budget-utils' {
  export function formatCurrency(amount: number, currency: string): string;
  export function calculatePercentage(value: number, total: number): number;
  export function generateReport(transactions: any[]): string;
}
