/**
 * Экранирует специальные символы для CSV формата
 * @param value - значение для экранирования (строка или число)
 * @returns экранированная строка
 */
export function escapeCsvValue(value: string | number): string {
    // Преобразуем значение в строку
    const stringValue = String(value);
    
    // Проверяем, содержит ли значение специальные символы
    const hasSpecialChars = /[,"'\n\r\t]/.test(stringValue);
    
    // Если есть специальные символы, обрамляем кавычками и экранируем существующие кавычки
    if (hasSpecialChars) {
        // Заменяем двойные кавычки на две двойные кавычки (стандарт CSV)
        const escapedValue = stringValue.replace(/"/g, '""');
        return `"${escapedValue}"`;
    }
    
    return stringValue;
}
