import { Transaction } from '../../application/gateway/transaction';
import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class MikroOrmTransaction implements Transaction {
  constructor(private readonly entityManager: EntityManager) {}

  run(callback: () => Promise<void>): Promise<void> {
    return this.entityManager.transactional<void>(() => callback());
  }
}
