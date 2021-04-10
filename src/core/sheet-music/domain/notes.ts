import { Note } from './note';
import { NoteDuration } from './note-duration';
import { NoteId } from './note-id';

export class Notes {
  private readonly notes: Map<string, Note> = new Map();
  private readonly noteDurations: Map<string, NoteDuration> = new Map();

  add(noteId: NoteId, note: Note, noteDuration: NoteDuration): void {
    this.notes.set(noteId.uuid.toString(), note);
    this.noteDurations.set(noteId.uuid.toString(), noteDuration);
  }

  has(noteId: NoteId): boolean {
    return this.notes.has(noteId.uuid.toString());
  }

  remove(noteId: NoteId): void {
    this.notes.delete(noteId.uuid.toString());
    this.noteDurations.delete(noteId.uuid.toString());
  }

  sumUpAllNoteDurations(): number {
    return Array.from(this.noteDurations.values())
      .map((noteDuration) => noteDuration.toNumber())
      .reduce((a, b) => a + b, 0);
  }
}
