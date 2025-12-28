/**
 * Декоратор свойства, делающий его доступным только для чтения
 * @param target - Прототип класса
 * @param propertyKey - Имя свойства
 */
export function ReadOnly(target: any, propertyKey: string) {
  const privateKey = `_${propertyKey}`;

  // Создаем геттер и сеттер
  Object.defineProperty(target, propertyKey, {
    get() {
      return (this as any)[privateKey];
    },
    set(value: any) {
      // Если значение еще не установлено, устанавливаем его
      if ((this as any)[privateKey] === undefined) {
        (this as any)[privateKey] = value;
        console.log(`Свойство ${propertyKey} инициализировано значением: ${value}`);
      } else {
        // Если значение уже установлено, запрещаем изменение
        console.error(`Попытка изменить свойство ${propertyKey}, которое доступно только для чтения. Текущее значение: ${(this as any)[privateKey]}, новое значение: ${value}`);
        throw new Error(`Свойство ${propertyKey} доступно только для чтения и не может быть изменено после инициализации`);
      }
    },
    enumerable: true,
    configurable: false
  });
}
