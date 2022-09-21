import { Transaction } from '../../application/gateway/transaction';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DirectExecutionTransaction implements Transaction {
  run(callback: () => Promise<void>): Promise<void> {
    return callback();
  }
}
