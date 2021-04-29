import { MeasureCurrentRepository } from '../../../application/gateway/measure-current.repository';
import { MeasureCurrentProjection } from '../../../application/projection/measure-current/measure-current.projection';
import { Injectable } from '@nestjs/common';
import { MikroOrmMeasureCurrentEntityRepository } from './mikro-orm-measure-current-entity.repository';
import { MeasureCurrentEntityMapper } from './measure-current-entity.mapper';
import { Uuid } from '../../../../shared/domain/uuid';
import { LockMode } from '@mikro-orm/core';

@Injectable()
export class MikroOrmMeasureCurrentRepository
  implements MeasureCurrentRepository {
  constructor(
    private readonly entityRepository: MikroOrmMeasureCurrentEntityRepository,
    private readonly mapper: MeasureCurrentEntityMapper,
  ) {}

  async save(projection: MeasureCurrentProjection): Promise<void> {
    this.entityRepository.add(this.mapper.mapToEntity(projection));
  }

  async get(id: Uuid): Promise<MeasureCurrentProjection> {
    return this.mapper.mapToProjection(
      await this.entityRepository.findOneOrFail(
        { id },
        { lockMode: LockMode.PESSIMISTIC_WRITE },
      ),
    );
  }

  async update(projection: MeasureCurrentProjection): Promise<void> {
    return this.entityRepository.update(this.mapper.mapToEntity(projection));
  }

  async delete(id: Uuid): Promise<void> {
    return this.entityRepository.delete(id);
  }
}
