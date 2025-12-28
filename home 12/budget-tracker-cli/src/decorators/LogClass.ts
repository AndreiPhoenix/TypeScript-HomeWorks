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
      console.log(
        `Создан экземпляр класса ${constructor.name} с аргументами: ${JSON.stringify(args)}`
      );
    }
  };
}
