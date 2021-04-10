import { NoteId } from '../../domain/note-id';
import { MeasureId } from '../../domain/measure-id';

export class RemoveNoteFromMeasureCommand {
  constructor(
    public readonly noteId: NoteId,
    public readonly measureId: MeasureId,
  ) {}
}
