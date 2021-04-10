import { DomainEvent } from './domain-event';
import { DomainEventStream } from './domain-event-stream';
import { PersistableEvent } from './persistable-event';

export abstract class Aggregate {
  private version = 0;
  private readonly pendingDomainEventStream = new DomainEventStream();
  private isDeleted = false;

  abstract apply(event: DomainEvent): void;

  getPendingDomainEventStream(): DomainEventStream {
    return this.pendingDomainEventStream;
  }

  protected publish(event: DomainEvent): void {
    this.assertAggregateIsNotDeleted();

    this.version++;

    this.pendingDomainEventStream.append(
      new PersistableEvent(this.version, event),
    );

    this.apply(event);
  }

  protected reconstitute(domainEventStream: DomainEventStream): void {
    domainEventStream.collect().forEach((event) => {
      this.version = event.version;

      this.apply(event.domainEvent);

      this.assertAggregateIsNotDeleted();
    });
  }

  protected markAsDeleted(): void {
    this.isDeleted = true;
  }

  private assertAggregateIsNotDeleted(): void {
    if (this.isDeleted) {
      throw new Error('Aggregate is deleted');
    }
  }
}
