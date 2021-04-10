import { MeasureId } from '../../domain/measure-id';
import { NoteId } from '../../domain/note-id';
import { NoteDuration } from '../../domain/note-duration';

export class AddNoteToMeasureCommand {
  constructor(
    public readonly id: NoteId,
    public readonly measureId: MeasureId,
    public readonly noteDuration: NoteDuration,
  ) {}
}
