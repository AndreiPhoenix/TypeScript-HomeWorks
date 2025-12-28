/**
 * Экранирует значение для CSV
 * @param value - Значение для экранирования
 * @returns Экранированная строка
 */
export function escapeCsvValue(value: any): string {
  if (value === null || value === undefined) {
    return '""';
  }
  
  const stringValue = String(value);
  
  // Если строка содержит кавычки, запятые или переносы строк, заключаем в кавычки
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n') || stringValue.includes('\r')) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }
  
  return stringValue;
}

/**
 * Преобразует массив объектов в CSV строку
 * @param data - Массив объектов
 * @returns CSV строка
 */
export function toCsv(data: Record<string, any>[]): string {
  if (data.length === 0) {
    return '';
  }
  
  const headers = Object.keys(data[0]);
  const rows = data.map(row => 
    headers.map(header => escapeCsvValue(row[header])).join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
}

/**
 * Создает CSV строку из транзакций
 * @param transactions - Массив транзакций
 * @returns CSV строка
 */
export function transactionsToCsv(transactions: any[]): string {
  const csvData = transactions.map(t => ({
    ID: t.id,
    Тип: t.type === 'income' ? 'Доход' : 'Расход',
    Сумма: t.amount,
    Категория: t.category,
    Описание: t.description || '',
    Дата: t.date.toISOString()
  }));
  
  return toCsv(csvData);
}
