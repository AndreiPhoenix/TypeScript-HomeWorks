/**
 * Типы для утилит бюджета
 */

declare module './budget-utils' {
  export function formatCurrency(amount: number, currency?: string, locale?: string): string;
  
  export function calculatePercentage(part: number, total: number): number;
  
  export function roundTo(value: number, decimals?: number): number;
  
  export function getRandomColor(): string;
  
  export function isValidDate(dateString: string): boolean;
  
  export function daysBetween(date1: string | Date, date2: string | Date): number;
}
