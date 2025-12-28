/**
 * Декоратор метода для логирования вызовов и результатов
 * @param target - Прототип класса
 * @param propertyKey - Имя метода
 * @param descriptor - Дескриптор свойства
 */
export function LogMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(
      `Вызов метода ${propertyKey} с аргументами: ${JSON.stringify(args)}`
    );

    const result = originalMethod.apply(this, args);

    console.log(`Метод ${propertyKey} вернул: ${JSON.stringify(result)}`);

    return result;
  };

  return descriptor;
}
