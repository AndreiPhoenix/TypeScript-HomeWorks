import { ITransaction } from "../interfaces/ITransaction.js";
import { TransactionType } from "../interfaces/TransactionType.js";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export class Transaction implements ITransaction {
  readonly id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: Date;
  description?: string;

  constructor(
    type: TransactionType,
    amount: number,
    category: string,
    date: Date = new Date(),
    description?: string
  ) {
    this.id = uuidv4();
    this.type = type;
    this.amount = amount;
    this.category = category;
    this.date = date;
    this.description = description;
  }

  getFormattedDate(): string {
    return moment(this.date).format("LL");
  }

  toString(): string {
    const sign = this.type === TransactionType.Income ? "+" : "-";
    const formattedAmount = `${sign}${this.amount.toFixed(2)}`;
    const dateStr = this.getFormattedDate();
    return `[${dateStr}] ${this.category}: ${formattedAmount} ${
      this.description ? `(${this.description})` : ""
    }`;
  }
}
