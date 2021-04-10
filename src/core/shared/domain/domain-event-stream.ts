import { PersistableEvent } from './persistable-event';

export class DomainEventStream {
  private events: PersistableEvent[] = [];

  append(event: PersistableEvent): void {
    this.events.push(event);
  }

  collect(): PersistableEvent[] {
    this.assertThatHasAtLeastOneEvent();

    return this.events;
  }

  first(): PersistableEvent {
    this.assertThatHasAtLeastOneEvent();

    return this.events[0];
  }

  private assertThatHasAtLeastOneEvent(): void {
    if (this.events.length === 0) {
      throw new Error('There are no events in the current domain event stream');
    }
  }
}
