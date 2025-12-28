/**
 * Декоратор свойства, делающий его доступным только для чтения
 * @param target - Прототип класса
 * @param propertyKey - Имя свойства
 */
export function ReadOnly(target: any, propertyKey: string) {
  const descriptor: PropertyDescriptor = {
    get() {
      return (this as any)[`_${propertyKey}`];
    },
    set(value: any) {
      if ((this as any)[`_${propertyKey}`] === undefined) {
        (this as any)[`_${propertyKey}`] = value;
      } else {
        throw new Error(`Свойство ${propertyKey} доступно только для чтения`);
      }
    },
    enumerable: true,
    configurable: false,
  };

  Object.defineProperty(target, propertyKey, descriptor);
}
