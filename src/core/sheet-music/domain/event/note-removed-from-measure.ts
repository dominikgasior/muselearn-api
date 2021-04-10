import { DomainEvent } from '../../../shared/domain/domain-event';
import { Uuid } from '../../../shared/domain/uuid';
import { NoteId } from '../note-id';
import { Type } from 'class-transformer';

export class NoteRemovedFromMeasure extends DomainEvent {
  @Type(() => NoteId)
  public readonly noteId: NoteId;

  constructor(aggregateId: Uuid, occurredAt: Date, noteId: NoteId) {
    super(aggregateId, occurredAt);
    this.noteId = noteId;
  }
}
