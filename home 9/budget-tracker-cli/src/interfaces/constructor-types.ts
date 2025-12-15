import { Transaction } from '../classes/Transaction';
import { Account } from '../classes/Account';

// 5. Работа с типами функций
export type TransactionConstructorParams = ConstructorParameters<typeof Transaction>;
export type TransactionInstance = InstanceType<typeof Transaction>;

export type AccountConstructorParams = ConstructorParameters<typeof Account>;
export type AccountInstance = InstanceType<typeof Account>;
