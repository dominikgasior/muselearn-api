import { EventStore } from './event-store';
import { Injectable } from '@nestjs/common';
import { MikroOrmPersistableEventRepository } from './mikro-orm-persistable-event.repository';
import { EventEntityMapper } from './event-entity.mapper';
import { Uuid } from '../../domain/uuid';
import { DomainEventStream } from '../../domain/domain-event-stream';

@Injectable()
export class MikroOrmEventStore implements EventStore {
  constructor(
    private readonly repository: MikroOrmPersistableEventRepository,
    private readonly mapper: EventEntityMapper,
  ) {}

  append(domainEventStream: DomainEventStream): void {
    domainEventStream
      .collect()
      .forEach((event) => this.repository.add(this.mapper.mapToEntity(event)));
  }

  async load(aggregateId: Uuid): Promise<DomainEventStream> {
    const domainEventStream = new DomainEventStream();

    const eventEntities = await this.repository.findByAggregateId(aggregateId);

    eventEntities.forEach((eventEntity) =>
      domainEventStream.append(this.mapper.mapToModel(eventEntity)),
    );

    return domainEventStream;
  }
}
