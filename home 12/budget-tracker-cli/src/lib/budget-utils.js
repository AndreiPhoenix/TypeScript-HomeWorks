/**
 * Утилиты для работы с бюджетом (JavaScript версия)
 */

// Форматирование денежных сумм
function formatCurrency(amount, currency = 'RUB', locale = 'ru-RU') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Расчет процента
function calculatePercentage(part, total) {
  if (total === 0) return 0;
  return (part / total) * 100;
}

// Округление до указанного количества знаков
function roundTo(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

// Генерация случайного цвета для категорий
function getRandomColor() {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2',
    '#EF476F', '#26547C', '#FFD166', '#F78C6B', '#83D483'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Проверка, является ли строка валидной датой
function isValidDate(dateString) {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
}

// Расчет разницы между датами в днях
function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // часов * минут * секунд * миллисекунд
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / oneDay));
  return diffDays;
}

module.exports = {
  formatCurrency,
  calculatePercentage,
  roundTo,
  getRandomColor,
  isValidDate,
  daysBetween
};
