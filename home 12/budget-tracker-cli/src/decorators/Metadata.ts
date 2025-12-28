import 'reflect-metadata';

/**
 * Декоратор для сохранения метаданных свойств
 * @param key - Ключ метаданных
 * @param value - Значение метаданных
 */
export function Metadata(key: string, value: any) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata(key, value, target, propertyKey);
  };
}
