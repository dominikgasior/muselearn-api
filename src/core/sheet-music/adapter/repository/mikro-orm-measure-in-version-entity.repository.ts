import { EntityRepository } from '@mikro-orm/postgresql';
import { MeasureInVersionEntity } from './measure-in-version.entity';
import { Repository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Uuid } from '../../../shared/domain/uuid';

@Injectable()
@Repository(MeasureInVersionEntity)
export class MikroOrmMeasureInVersionEntityRepository extends EntityRepository<MeasureInVersionEntity> {
  add(entity: MeasureInVersionEntity): void {
    this.persist(entity);
  }

  findOneByIdAndVersionOrFail(
    id: Uuid,
    version: number,
  ): Promise<MeasureInVersionEntity> {
    return this.findOneOrFail({ id, version });
  }
}
