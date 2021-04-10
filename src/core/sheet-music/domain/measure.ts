import { Aggregate } from '../../shared/domain/aggregate';
import { MeasureCreated } from './event/measure-created';
import { DomainEvent } from '../../shared/domain/domain-event';
import { DomainEventStream } from '../../shared/domain/domain-event-stream';
import { MeasureId } from './measure-id';
import { NoteId } from './note-id';
import { NoteAddedToMeasure } from './event/note-added-to-measure';
import { ClefType } from './clef-type';
import { TimeSignature } from './time-signature';
import { NoteDuration } from './note-duration';
import { Notes } from './notes';
import { AddNoteSpecification } from './add-note-specification';
import { Note } from './note';
import { NoteRemovedFromMeasure } from './event/note-removed-from-measure';
import { MeasureDeleted } from './event/measure-deleted';

export class Measure extends Aggregate {
  private readonly notes = new Notes();

  private constructor(
    private readonly id: MeasureId,
    private readonly clefType: ClefType,
    private readonly timeSignature: TimeSignature,
  ) {
    super();
  }

  static createFromDomainEventStream(
    domainEventStream: DomainEventStream,
  ): Measure {
    const measureCreatedEvent = domainEventStream.first().domainEvent;

    if (!(measureCreatedEvent instanceof MeasureCreated)) {
      throw new Error('First event in the stream should be initializing event');
    }

    const measure = Measure.applyMeasureCreatedEvent(measureCreatedEvent);

    measure.reconstitute(domainEventStream);

    return measure;
  }

  static createEmpty(
    id: MeasureId,
    clefType: ClefType,
    timeSignature: TimeSignature,
    now: Date,
  ): Measure {
    const measure = new Measure(id, clefType, timeSignature);

    measure.publish(new MeasureCreated(id.uuid, now, clefType, timeSignature));

    return measure;
  }

  addNote(noteId: NoteId, noteDuration: NoteDuration, now: Date): void {
    const addNoteSpecification = new AddNoteSpecification();

    if (
      !addNoteSpecification.isSatisfiedBy(
        this.notes,
        this.timeSignature,
        noteDuration,
      )
    ) {
      throw new Error('Cannot add note to measure');
    }

    this.publish(
      new NoteAddedToMeasure(this.id.uuid, now, noteId, noteDuration),
    );
  }

  removeNote(noteId: NoteId, now: Date): void {
    if (!this.notes.has(noteId)) {
      throw new Error('There is no such note in the measure');
    }

    this.publish(new NoteRemovedFromMeasure(this.id.uuid, now, noteId));
  }

  delete(now: Date): void {
    this.publish(new MeasureDeleted(this.id.uuid, now));
  }

  apply(event: DomainEvent): void {
    switch (event.constructor) {
      case MeasureCreated:
        break;
      case NoteAddedToMeasure:
        this.applyNoteAddedToMeasureEvent(event as NoteAddedToMeasure);
        break;
      case NoteRemovedFromMeasure:
        this.applyNoteRemovedFromMeasureEvent(event as NoteRemovedFromMeasure);
        break;
      case MeasureDeleted:
        this.applyMeasureDeletedEvent(event as MeasureDeleted);
        break;
      default:
        throw new Error(`Unknown event type given: ${event.constructor.name}`);
    }
  }

  private static applyMeasureCreatedEvent(event: MeasureCreated): Measure {
    return new Measure(
      new MeasureId(event.aggregateId),
      event.clefType,
      event.timeSignature,
    );
  }

  private applyNoteAddedToMeasureEvent(event: NoteAddedToMeasure): void {
    const noteId = event.noteId;
    const noteDuration = event.noteDuration;
    const note = new Note(noteId, noteDuration);

    this.notes.add(noteId, note, noteDuration);
  }

  private applyNoteRemovedFromMeasureEvent(
    event: NoteRemovedFromMeasure,
  ): void {
    this.notes.remove(event.noteId);
  }

  private applyMeasureDeletedEvent(event: MeasureDeleted): void {
    this.markAsDeleted();
  }
}
