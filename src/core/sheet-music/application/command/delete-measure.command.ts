import { MeasureId } from '../../domain/measure-id';

export class DeleteMeasureCommand {
  constructor(public readonly id: MeasureId) {}
}
