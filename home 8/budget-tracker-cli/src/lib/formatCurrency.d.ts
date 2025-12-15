declare module "formatCurrency" {
  export function formatCurrency(amount: number, symbol?: string): string;
  export function parseDate(dateString: string): Date;
}
