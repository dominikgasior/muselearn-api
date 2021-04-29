import { Injectable } from '@nestjs/common';
import { MeasureCurrentProjection } from '../../../application/projection/measure-current/measure-current.projection';
import { MeasureCurrentEntity } from './measure-current.entity';
import { Uuid } from '../../../../shared/domain/uuid';
import { classToPlain, plainToClass } from 'class-transformer';

@Injectable()
export class MeasureCurrentEntityMapper {
  mapToEntity(projection: MeasureCurrentProjection): MeasureCurrentEntity {
    return new MeasureCurrentEntity(
      Uuid.create(projection.id),
      projection.version,
      new Date(projection.aggregateCreatedAt),
      classToPlain(projection),
    );
  }

  mapToProjection(entity: MeasureCurrentEntity): MeasureCurrentProjection {
    return plainToClass(MeasureCurrentProjection, entity.data);
  }
}
