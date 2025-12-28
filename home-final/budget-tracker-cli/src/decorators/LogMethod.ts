export function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`Вызов метода ${propertyKey} с аргументами:`, args);
    const result = originalMethod.apply(this, args);
    console.log(`Метод ${propertyKey} вернул:`, result);
    return result;
  };
  
  return descriptor;
}
