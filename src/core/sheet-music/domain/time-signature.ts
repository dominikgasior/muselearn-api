import { NoteDurationEnum } from './note-duration.enum';
import { NoteDuration } from './note-duration';
import { Type } from 'class-transformer';

export class TimeSignature {
  @Type(() => NoteDuration)
  private readonly noteDuration: NoteDuration;

  private constructor(
    private readonly beatsInMeasure: number,
    noteDuration: NoteDuration,
  ) {
    this.noteDuration = noteDuration;
  }

  static create(
    beatsInMeasure: number,
    noteDuration: NoteDuration,
  ): TimeSignature {
    if (!this.validate(noteDuration)) {
      throw new Error(`Invalid noteDuration given: ${noteDuration}`);
    }

    return new TimeSignature(beatsInMeasure, noteDuration);
  }

  toTotalMeasureNoteDurationNumber(): number {
    return this.beatsInMeasure * this.noteDuration.toNumber();
  }

  toString(): string {
    return this.beatsInMeasure + '/' + this.noteDuration.toNumber();
  }

  private static validate(noteDuration: NoteDuration): boolean {
    const allowedNoteDurations = [
      new NoteDuration(NoteDurationEnum.HalfNote),
      new NoteDuration(NoteDurationEnum.QuarterNote),
      new NoteDuration(NoteDurationEnum.EighthNote),
    ];

    for (const allowedNoteDuration of allowedNoteDurations) {
      if (noteDuration.equals(allowedNoteDuration)) {
        return true;
      }
    }

    return false;
  }
}
