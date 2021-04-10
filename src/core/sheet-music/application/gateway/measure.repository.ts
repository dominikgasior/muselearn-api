import { Measure } from '../../domain/measure';
import { MeasureId } from '../../domain/measure-id';

export abstract class MeasureRepository {
  abstract save(measure: Measure): Promise<void>;
  abstract get(id: MeasureId): Promise<Measure>;
}
