export abstract class Transaction {
  abstract run(callback: () => Promise<void>): Promise<void>;
}
