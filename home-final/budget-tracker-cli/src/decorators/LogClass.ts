export function LogClass(target: Function) {
  const original = target;
  
  const newConstructor: any = function (...args: any[]) {
    console.log(`Создание экземпляра класса ${original.name}`);
    return new original(...args);
  };
  
  newConstructor.prototype = original.prototype;
  return newConstructor;
}
