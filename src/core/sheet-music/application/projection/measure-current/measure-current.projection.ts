import { Type } from 'class-transformer';
import { MeasureCreated } from '../../../domain/event/measure-created';
import { NoteAddedToMeasure } from '../../../domain/event/note-added-to-measure';
import { NoteRemovedFromMeasure } from '../../../domain/event/note-removed-from-measure';

export interface Note {
  id: string;
  noteDuration: number;
}

export class MeasureCurrentProjection {
  @Type(() => Map)
  public readonly notes: Map<string, Note> = new Map();

  constructor(
    public version: number,
    public readonly id: string,
    public readonly clefType: string,
    public readonly timeSignature: string,
    public readonly aggregateCreatedAt: string,
  ) {}

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
