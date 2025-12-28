/**
 * Декоратор класса для логирования создания экземпляров
 * @param constructor - Конструктор класса
 */
export function LogClass<T extends { new (...args: any[]): {} }>(
  constructor: T
) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      const className = constructor.name;
      const argsString = args.map(arg => {
        if (typeof arg === 'object' && arg !== null) {
          return JSON.stringify(arg, null, 2);
        }
        return String(arg);
      }).join(', ');
      
      console.log(
        `[${new Date().toISOString()}] Создан экземпляр класса ${className} с аргументами: [${argsString}]`
      );
    }
  };
}
