import { ClefTypeEnum } from './clef-type.enum';

export class ClefType {
  constructor(private readonly type: ClefTypeEnum) {}

  static createFromString(clefType: string): ClefType {
    if (!ClefType.validate(clefType)) {
      throw new Error(`Invalid clefType given: ${clefType}`);
    }

    return new ClefType(clefType);
  }

  private static validate(clefType: string): clefType is ClefTypeEnum {
    return Object.values(ClefTypeEnum).includes(clefType as ClefTypeEnum);
  }
}
