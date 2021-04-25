import { DomainEventStream } from '../../../shared/domain/domain-event-stream';

export abstract class DomainEventPublisher {
  abstract publish(domainEventStream: DomainEventStream): void;
}
