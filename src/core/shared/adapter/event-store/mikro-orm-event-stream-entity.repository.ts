import { EntityRepository } from '@mikro-orm/postgresql';
import { EventStreamEntity } from './event-stream.entity';
import { Repository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Uuid } from '../../domain/uuid';

@Injectable()
@Repository(EventStreamEntity)
export class MikroOrmEventStreamEntityRepository extends EntityRepository<EventStreamEntity> {
  add(entity: EventStreamEntity): void {
    this.persist(entity);
  }

  async findByAggregateId(aggregateId: Uuid): Promise<EventStreamEntity[]> {
    return this.createQueryBuilder('event').where({ aggregateId }).getResult();
  }
}
