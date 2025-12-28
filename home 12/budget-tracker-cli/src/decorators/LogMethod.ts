/**
 * Декоратор метода для логирования вызовов и результатов
 * @param target - Прототип класса или конструктор
 * @param propertyKey - Имя метода
 * @param descriptor - Дескриптор свойства
 */
export function LogMethod(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const className = target.constructor.name;

  descriptor.value = function (...args: any[]) {
    const timestamp = new Date().toISOString();
    const argsString = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        return JSON.stringify(arg, null, 2);
      }
      return String(arg);
    }).join(', ');
    
    console.log(
      `[${timestamp}] Вызов метода ${className}.${propertyKey} с аргументами: [${argsString}]`
    );

    try {
      const result = originalMethod.apply(this, args);
      
      if (result instanceof Promise) {
        return result.then(asyncResult => {
          console.log(
            `[${new Date().toISOString()}] Метод ${className}.${propertyKey} вернул (async): ${JSON.stringify(asyncResult, null, 2)}`
          );
          return asyncResult;
        }).catch(error => {
          console.error(
            `[${new Date().toISOString()}] Метод ${className}.${propertyKey} вызвал ошибку: ${error.message}`
          );
          throw error;
        });
      } else {
        console.log(
          `[${new Date().toISOString()}] Метод ${className}.${propertyKey} вернул: ${JSON.stringify(result, null, 2)}`
        );
        return result;
      }
    } catch (error: any) {
      console.error(
        `[${new Date().toISOString()}] Метод ${className}.${propertyKey} вызвал ошибку: ${error.message}`
      );
      throw error;
    }
  };

  return descriptor;
}
