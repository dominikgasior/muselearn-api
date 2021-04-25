import { Projection } from '../../../shared/application/projection';
import { Type } from 'class-transformer';
import { Note } from './note';
import { MeasureCreated } from '../../domain/event/measure-created';
import { NoteAddedToMeasure } from '../../domain/event/note-added-to-measure';
import { NoteRemovedFromMeasure } from '../../domain/event/note-removed-from-measure';

export class MeasureCurrentProjection extends Projection {
  @Type(() => Map)
  public readonly notes: Map<string, Note> = new Map();

  constructor(
    version: number,
    public readonly id: string,
    public readonly clefType: string,
    public readonly timeSignature: string,
    public readonly aggregateCreatedAt: string,
  ) {
    super(version);
  }

  static applyMeasureCreated(event: MeasureCreated): MeasureCurrentProjection {
    return new MeasureCurrentProjection(
      1,
      event.aggregateId.toString(),
      event.clefType.toString(),
      event.timeSignature.toString(),
      event.occurredAt.toISOString(),
    );
  }

  applyNoteAddedToMeasure(event: NoteAddedToMeasure, version: number): void {
    const noteId = event.noteId.uuid.toString();

    this.notes.set(noteId, {
      id: noteId,
      noteDuration: event.noteDuration.toNumber(),
    });

    this.version = version;
  }

  applyNoteRemovedFromMeasure(
    event: NoteRemovedFromMeasure,
    version: number,
  ): void {
    this.notes.delete(event.noteId.uuid.toString());

    this.version = version;
  }
}
