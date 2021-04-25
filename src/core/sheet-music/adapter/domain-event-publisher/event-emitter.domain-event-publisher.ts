import { DomainEventPublisher } from '../../application/gateway/domain-event.publisher';
import { DomainEventStream } from '../../../shared/domain/domain-event-stream';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventEmitterDomainEventPublisher implements DomainEventPublisher {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish(domainEventStream: DomainEventStream): void {
    domainEventStream
      .collect()
      .forEach((event) =>
        this.eventEmitter.emit(event.domainEvent.constructor.name, event),
      );
  }
}
