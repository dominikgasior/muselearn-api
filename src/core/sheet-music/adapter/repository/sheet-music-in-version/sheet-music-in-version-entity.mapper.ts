import { Injectable } from '@nestjs/common';
import { SheetMusicInVersionEntity } from './sheet-music-in-version.entity';
import { SheetMusicInVersionProjection } from '../../../application/projection/sheet-music-in-version/sheet-music-in-version.projection';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class SheetMusicInVersionEntityMapper {
  mapToEntity(
    projection: SheetMusicInVersionProjection,
    type: string,
    occurredAt: Date,
  ): SheetMusicInVersionEntity {
    return new SheetMusicInVersionEntity(
      type,
      occurredAt,
      classToPlain(projection),
    );
  }

  mapToProjection(
    entity: SheetMusicInVersionEntity,
  ): SheetMusicInVersionProjection {
    return plainToClass(SheetMusicInVersionProjection, entity.data);
  }
}
