/**
 * Утилитарные типы TypeScript
 */

// Делает все свойства опциональными
export type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Делает все свойства обязательными
export type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Делает все свойства доступными только для чтения
export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Выбирает подмножество свойств из типа
export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Исключает свойства из типа
export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Тип для конструктора
export type Constructor<T = {}> = new (...args: any[]) => T;

// Тип для функции
export type FunctionType<T = any> = (...args: any[]) => T;
