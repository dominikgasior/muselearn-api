import { NoteId } from './note-id';
import { NoteDuration } from './note-duration';

export class Note {
  constructor(
    private readonly id: NoteId,
    private readonly noteDuration: NoteDuration,
  ) {}
}
