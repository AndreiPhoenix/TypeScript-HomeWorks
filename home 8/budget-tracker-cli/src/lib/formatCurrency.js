// formatCurrency.js - нетипизированная библиотека
export function formatCurrency(amount, symbol = "₽") {
  return amount.toFixed(2) + " " + symbol;
}

export function parseDate(dateString) {
  return new Date(dateString);
}
