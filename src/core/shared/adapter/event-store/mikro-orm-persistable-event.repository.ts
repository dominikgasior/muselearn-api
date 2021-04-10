import { EntityRepository } from '@mikro-orm/postgresql';
import { EventEntity } from './event-entity';
import { Repository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Uuid } from '../../domain/uuid';

@Injectable()
@Repository(EventEntity)
export class MikroOrmPersistableEventRepository extends EntityRepository<EventEntity> {
  add(eventEntity: EventEntity): void {
    this.persist(eventEntity);
  }

  async findByAggregateId(aggregateId: Uuid): Promise<EventEntity[]> {
    return this.createQueryBuilder('event').where({ aggregateId }).getResult();
  }
}
