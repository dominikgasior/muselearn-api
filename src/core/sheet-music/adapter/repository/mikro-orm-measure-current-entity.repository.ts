import { EntityRepository } from '@mikro-orm/postgresql';
import { MeasureCurrentEntity } from './measure-current.entity';
import { Repository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Uuid } from '../../../shared/domain/uuid';

@Injectable()
@Repository(MeasureCurrentEntity)
export class MikroOrmMeasureCurrentEntityRepository extends EntityRepository<MeasureCurrentEntity> {
  add(entity: MeasureCurrentEntity): void {
    this.persist(entity);
  }

  async update(entity: MeasureCurrentEntity): Promise<void> {
    return this.createQueryBuilder()
      .update({ version: entity.version, data: entity.data })
      .where({ id: entity.id })
      .execute();
  }

  async delete(id: Uuid): Promise<void> {
    return this.createQueryBuilder().delete({ id }).execute();
  }
}
