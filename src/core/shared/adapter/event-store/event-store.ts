import { Uuid } from '../../domain/uuid';
import { DomainEventStream } from '../../domain/domain-event-stream';

export abstract class EventStore {
  abstract append(domainEventStream: DomainEventStream): void;
  abstract load(aggregateId: Uuid): Promise<DomainEventStream>;
}
