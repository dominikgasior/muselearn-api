import { SheetMusicInVersionRepository } from '../../../application/gateway/sheet-music-in-version.repository';
import { SheetMusicInVersionProjection } from '../../../application/projection/sheet-music-in-version/sheet-music-in-version.projection';
import { Injectable } from '@nestjs/common';
import { SheetMusicInVersionEntityMapper } from './sheet-music-in-version-entity.mapper';
import { MikroOrmSheetMusicInVersionEntityRepository } from './mikro-orm-sheet-music-in-version-entity.repository';

@Injectable()
export class MikroOrmSheetMusicInVersionRepository
  implements SheetMusicInVersionRepository {
  constructor(
    private readonly mapper: SheetMusicInVersionEntityMapper,
    private readonly entityRepository: MikroOrmSheetMusicInVersionEntityRepository,
  ) {}

  async save(
    projection: SheetMusicInVersionProjection,
    type: string,
    occurredAt: Date,
  ): Promise<void> {
    this.entityRepository.add(
      this.mapper.mapToEntity(projection, type, occurredAt),
    );
  }

  async getPrevious(): Promise<SheetMusicInVersionProjection> {
    const previous = await this.entityRepository.getPrevious();

    if (previous === null) {
      return new SheetMusicInVersionProjection();
    }

    return this.mapper.mapToProjection(previous);
  }
}
