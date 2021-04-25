import { MeasureInVersionRepository } from '../../application/gateway/measure-in-version.repository';
import { MeasureInVersionProjection } from '../../application/projection/measure-in-version.projection';
import { Injectable } from '@nestjs/common';
import { MeasureInVersionEntityMapper } from './measure-in-version-entity.mapper';
import { MikroOrmMeasureInVersionEntityRepository } from './mikro-orm-measure-in-version-entity.repository';
import { Uuid } from '../../../shared/domain/uuid';

@Injectable()
export class MikroOrmMeasureInVersionRepository
  implements MeasureInVersionRepository {
  constructor(
    private readonly mapper: MeasureInVersionEntityMapper,
    private readonly entityRepository: MikroOrmMeasureInVersionEntityRepository,
  ) {}

  async save(projection: MeasureInVersionProjection): Promise<void> {
    this.entityRepository.add(this.mapper.mapToEntity(projection));
  }

  async get(
    id: Uuid,
    previousVersion: number,
  ): Promise<MeasureInVersionProjection> {
    return this.mapper.mapToProjection(
      await this.entityRepository.findOneByIdAndVersionOrFail(
        id,
        previousVersion,
      ),
    );
  }
}
