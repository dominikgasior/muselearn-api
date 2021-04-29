import { EntityRepository } from '@mikro-orm/postgresql';
import { SheetMusicInVersionEntity } from './sheet-music-in-version.entity';
import { LockMode, QueryOrder, Repository } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
@Repository(SheetMusicInVersionEntity)
export class MikroOrmSheetMusicInVersionEntityRepository extends EntityRepository<SheetMusicInVersionEntity> {
  add(entity: SheetMusicInVersionEntity): void {
    this.persist(entity);
  }

  getPrevious(): Promise<SheetMusicInVersionEntity | null> {
    return this.createQueryBuilder()
      .orderBy({ version: QueryOrder.DESC })
      .limit(1)
      .setLockMode(LockMode.PESSIMISTIC_WRITE)
      .execute('get');
  }
}
