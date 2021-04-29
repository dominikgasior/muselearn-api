import { MeasureCreated } from '../../../domain/event/measure-created';
import { NoteAddedToMeasure } from '../../../domain/event/note-added-to-measure';
import { Type } from 'class-transformer';
import { NoteRemovedFromMeasure } from '../../../domain/event/note-removed-from-measure';
import { MeasureDeleted } from '../../../domain/event/measure-deleted';

export interface Note {
  id: string;
  noteDuration: number;
}

class Measure {
  @Type(() => Map)
  public readonly notes: Map<string, Note> = new Map();

  constructor(
    public readonly id: string,
    public readonly clefType: string,
    public readonly timeSignature: string,
  ) {}
}

export class SheetMusicInVersionProjection {
  @Type(() => Measure)
  public readonly measures: Map<string, Measure> = new Map();

  applyMeasureCreated(event: MeasureCreated): void {
    this.measures.set(
      event.aggregateId.toString(),
      new Measure(
        event.aggregateId.toString(),
        event.clefType.toString(),
        event.timeSignature.toString(),
      ),
    );
  }

  applyNoteAddedToMeasure(event: NoteAddedToMeasure): void {
    const noteId = event.noteId.uuid.toString();

    const measure = this.measures.get(event.aggregateId.toString());

    measure?.notes.set(noteId, {
      id: noteId,
      noteDuration: event.noteDuration.toNumber(),
    });
  }

  applyNoteRemovedFromMeasure(event: NoteRemovedFromMeasure): void {
    const measure = this.measures.get(event.aggregateId.toString());

    measure?.notes.delete(event.noteId.uuid.toString());
  }

  applyMeasureDeleted(event: MeasureDeleted): void {
    this.measures.delete(event.aggregateId.toString());
  }
}
