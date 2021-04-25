import { MeasureInVersionProjection } from '../projection/measure-in-version.projection';
import { Uuid } from '../../../shared/domain/uuid';

export abstract class MeasureInVersionRepository {
  abstract save(projection: MeasureInVersionProjection): Promise<void>;
  abstract get(
    id: Uuid,
    previousVersion: number,
  ): Promise<MeasureInVersionProjection>;
}
