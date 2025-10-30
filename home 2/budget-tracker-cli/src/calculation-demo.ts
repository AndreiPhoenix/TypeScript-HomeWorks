// Объявление и инициализация переменных
const income: number = 50000; // общий доход за месяц
const expenses: number = 35000; // общий расход за месяц
const savings: number = 10000; // сумма для сбережений

// Вычисления
const netIncome: number = income - expenses; // чистый доход
const remaining: number = netIncome - savings; // оставшаяся сумма

// Вывод в консоль
console.log("=== Budget Tracker Calculations ===");
console.log(`Общий доход: ${income} руб.`);
console.log(`Общие расходы: ${expenses} руб.`);
console.log(`Запланированные сбережения: ${savings} руб.`);
console.log(`Чистый доход: ${netIncome} руб.`);
console.log(`Оставшаяся сумма: ${remaining} руб.`);

// Дополнительная проверка
if (remaining < 0) {
    console.log("⚠️ Внимание: Недостаточно средств для запланированных сбережений!");
} else if (remaining === 0) {
    console.log("ℹ️ Все средства распределены, остаток равен нулю.");
} else {
    console.log(`✅ Отлично! У вас осталось ${remaining} руб. после всех расходов и сбережений.`);
}
