import { MeasureInVersionEntity } from '../core/sheet-music/adapter/repository/measure-in-version.entity';
import { EventStreamEntity } from '../core/shared/adapter/event-store/event-stream.entity';
import { MeasureCurrentEntity } from '../core/sheet-music/adapter/repository/measure-current.entity';

export default {
  entities: [EventStreamEntity, MeasureInVersionEntity, MeasureCurrentEntity],
};
