import { EventEntity } from './event-entity';
import { Injectable } from '@nestjs/common';
import { PersistableEvent } from '../../domain/persistable-event';
import { classToPlain, plainToClass } from 'class-transformer';
import { UuidFactory } from '../../domain/uuid.factory';

@Injectable()
export class EventEntityMapper {
  constructor(private readonly uuidFactory: UuidFactory) {}

  mapToEntity(event: PersistableEvent): EventEntity {
    const persistableEventJson = classToPlain(event);

    return new EventEntity(
      this.uuidFactory.generateRandom(),
      event.domainEvent.aggregateId,
      event.version,
      event.domainEvent.occurredAt,
      persistableEventJson,
    );
  }

  mapToModel(eventEntity: EventEntity): PersistableEvent {
    return plainToClass(PersistableEvent, eventEntity.data);
  }
}
