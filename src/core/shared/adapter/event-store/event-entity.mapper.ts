import { EventStreamEntity } from './event-stream.entity';
import { Injectable } from '@nestjs/common';
import { PersistableEvent } from '../../domain/persistable-event';
import { classToPlain, plainToClass } from 'class-transformer';
import { UuidFactory } from '../../domain/uuid.factory';

@Injectable()
export class EventEntityMapper {
  constructor(private readonly uuidFactory: UuidFactory) {}

  mapToEntity(event: PersistableEvent): EventStreamEntity {
    return new EventStreamEntity(
      this.uuidFactory.generateRandom(),
      event.domainEvent.aggregateId,
      event.version,
      event.domainEvent.occurredAt,
      event.domainEvent.constructor.name,
      classToPlain(event),
    );
  }

  mapToModel(eventEntity: EventStreamEntity): PersistableEvent {
    return plainToClass(PersistableEvent, eventEntity.data);
  }
}
