import { NoteDurationEnum } from './note-duration.enum';

export class NoteDuration {
  constructor(private readonly noteDuration: NoteDurationEnum) {}

  static create(noteDuration: number): NoteDuration {
    if (!NoteDuration.validate(noteDuration)) {
      throw new Error(`Invalid noteDuration given: ${noteDuration}`);
    }

    return new NoteDuration(noteDuration);
  }

  equals(noteDuration: NoteDuration): boolean {
    return this.noteDuration.valueOf() === noteDuration.noteDuration.valueOf();
  }

  toNumber(): number {
    return this.noteDuration;
  }

  private static validate(
    noteDuration: number,
  ): noteDuration is NoteDurationEnum {
    return Object.values(NoteDurationEnum).includes(noteDuration);
  }
}
