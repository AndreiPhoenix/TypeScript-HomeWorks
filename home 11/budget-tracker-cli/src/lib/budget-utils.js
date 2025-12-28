// Файл-заглушка для демонстрации
export function formatCurrency(amount, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount);
}

export function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return (value / total) * 100;
}
