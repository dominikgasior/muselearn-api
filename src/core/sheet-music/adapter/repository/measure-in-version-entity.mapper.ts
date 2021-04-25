import { Injectable } from '@nestjs/common';
import { MeasureInVersionEntity } from './measure-in-version.entity';
import { MeasureInVersionProjection } from '../../application/projection/measure-in-version.projection';
import { classToPlain, plainToClass } from 'class-transformer';
import { Uuid } from '../../../shared/domain/uuid';

@Injectable()
export class MeasureInVersionEntityMapper {
  mapToEntity(projection: MeasureInVersionProjection): MeasureInVersionEntity {
    return new MeasureInVersionEntity(
      Uuid.create(projection.id),
      projection.version,
      new Date(projection.aggregateCreatedAt),
      classToPlain(projection),
    );
  }

  mapToProjection(entity: MeasureInVersionEntity): MeasureInVersionProjection {
    return plainToClass(MeasureInVersionProjection, entity.data);
  }
}
