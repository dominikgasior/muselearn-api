import { MeasureId } from '../../domain/measure-id';
import { ClefType } from '../../domain/clef-type';
import { TimeSignature } from '../../domain/time-signature';

export class AddMeasureCommand {
  constructor(
    public readonly id: MeasureId,
    public readonly clefType: ClefType,
    public readonly timeSignature: TimeSignature,
  ) {}
}
