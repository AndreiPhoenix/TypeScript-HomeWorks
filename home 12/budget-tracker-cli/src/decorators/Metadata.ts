import 'reflect-metadata';

/**
 * Декоратор для сохранения метаданных свойств
 * @param key - Ключ метаданных
 * @param value - Значение метаданных
 */
export function Metadata(key: string, value: any) {
  return function (target: any, propertyKey: string) {
    // Сохраняем метаданные для свойства
    Reflect.defineMetadata(key, value, target, propertyKey);
    
    // Также сохраняем информацию о том, что свойство имеет метаданные
    const existingMetadata = Reflect.getMetadata('hasMetadata', target) || [];
    if (!existingMetadata.includes(propertyKey)) {
      existingMetadata.push(propertyKey);
      Reflect.defineMetadata('hasMetadata', existingMetadata, target);
    }
    
    console.log(`Метаданные сохранены для свойства ${propertyKey}: ${key} = ${value}`);
  };
}

/**
 * Вспомогательная функция для получения всех метаданных свойства
 * @param target - Объект
 * @param propertyKey - Имя свойства
 */
export function getAllMetadata(target: any, propertyKey: string): Record<string, any> {
  const metadataKeys = Reflect.getMetadataKeys(target, propertyKey);
  const result: Record<string, any> = {};
  
  metadataKeys.forEach(key => {
    result[key] = Reflect.getMetadata(key, target, propertyKey);
  });
  
  return result;
}

/**
 * Вспомогательная функция для получения всех свойств с метаданными
 * @param target - Объект
 */
export function getPropertiesWithMetadata(target: any): string[] {
  return Reflect.getMetadata('hasMetadata', target) || [];
}
