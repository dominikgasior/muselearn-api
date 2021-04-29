import { SheetMusicInVersionEntity } from '../core/sheet-music/adapter/repository/sheet-music-in-version/sheet-music-in-version.entity';
import { EventStreamEntity } from '../core/shared/adapter/event-store/event-stream.entity';
import { MeasureCurrentEntity } from '../core/sheet-music/adapter/repository/measure-current/measure-current.entity';

export default {
  entities: [
    EventStreamEntity,
    SheetMusicInVersionEntity,
    MeasureCurrentEntity,
  ],
};
