import { Notes } from './notes';
import { TimeSignature } from './time-signature';
import { NoteDuration } from './note-duration';

export class AddNoteSpecification {
  isSatisfiedBy(
    measureNotes: Notes,
    timeSignature: TimeSignature,
    noteDuration: NoteDuration,
  ): boolean {
    const measureNoteDurationSum = measureNotes.sumUpAllNoteDurations();
    const totalMeasureNoteDurationNumber = timeSignature.toTotalMeasureNoteDurationNumber();
    const noteDurationNumberToAdd = noteDuration.toNumber();

    return (
      measureNoteDurationSum + noteDurationNumberToAdd <=
      totalMeasureNoteDurationNumber
    );
  }
}
