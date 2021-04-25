import { MeasureCurrentProjection } from '../projection/measure-current.projection';
import { Uuid } from '../../../shared/domain/uuid';

export abstract class MeasureCurrentRepository {
  abstract save(projection: MeasureCurrentProjection): Promise<void>;
  abstract get(id: Uuid): Promise<MeasureCurrentProjection>;
  abstract update(projection: MeasureCurrentProjection): Promise<void>;
  abstract delete(id: Uuid): Promise<void>;
}
