import { DomainEvent } from '../../../shared/domain/domain-event';
import { Type } from 'class-transformer';
import { Uuid } from '../../../shared/domain/uuid';
import { NoteId } from '../note-id';
import { NoteDuration } from '../note-duration';

export class NoteAddedToMeasure extends DomainEvent {
  @Type(() => NoteId)
  public readonly noteId: NoteId;

  @Type(() => NoteDuration)
  public readonly noteDuration: NoteDuration;

  constructor(
    aggregateId: Uuid,
    occurredAt: Date,
    noteId: NoteId,
    noteDuration: NoteDuration,
  ) {
    super(aggregateId, occurredAt);
    this.noteId = noteId;
    this.noteDuration = noteDuration;
  }
}
