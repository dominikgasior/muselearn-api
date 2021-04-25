import { DomainEvent } from './domain-event';
import { Type } from 'class-transformer';
import { MeasureCreated } from '../../sheet-music/domain/event/measure-created';
import { NoteAddedToMeasure } from '../../sheet-music/domain/event/note-added-to-measure';
import { NoteRemovedFromMeasure } from '../../sheet-music/domain/event/note-removed-from-measure';
import { MeasureDeleted } from '../../sheet-music/domain/event/measure-deleted';

export class PersistableEvent {
  @Type(() => DomainEvent, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: MeasureCreated, name: MeasureCreated.name },
        { value: NoteAddedToMeasure, name: NoteAddedToMeasure.name },
        {
          value: NoteRemovedFromMeasure,
          name: NoteRemovedFromMeasure.name,
        },
        { value: MeasureDeleted, name: MeasureDeleted.name },
      ],
    },
  })
  public readonly domainEvent: DomainEvent;

  constructor(public readonly version: number, domainEvent: DomainEvent) {
    this.domainEvent = domainEvent;
  }
}
