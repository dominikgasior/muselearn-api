import { Module } from '@nestjs/common';
import { SheetMusicRestController } from '../adapter/http/sheet-music.rest-controller';
import { SheetMusicFacade } from '../application/boundary/sheet-music.facade';
import { AddMeasureUseCase } from '../application/add-measure.use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmPersistableEventRepository } from '../../shared/adapter/event-store/mikro-orm-persistable-event.repository';
import { EntityManager } from '@mikro-orm/core';
import { EventEntity } from '../../shared/adapter/event-store/event-entity';
import { EventStore } from '../../shared/adapter/event-store/event-store';
import { MeasureRepository } from '../application/gateway/measure.repository';
import { MikroOrmMeasureRepository } from '../adapter/repository/mikro-orm-measure.repository';
import { EventEntityMapper } from '../../shared/adapter/event-store/event-entity.mapper';
import { MikroOrmEventStore } from '../../shared/adapter/event-store/mikro-orm.event-store';
import { Transaction } from '../../shared/application/gateway/transaction';
import { MikroOrmTransaction } from '../../shared/adapter/transaction/mikro-orm.transaction';
import { AddNoteToMeasureUseCase } from '../application/add-note-to-measure.use-case';
import { RemoveNoteFromMeasureUseCase } from '../application/remove-note-from-measure.use-case';
import { DeleteMeasureUseCase } from '../application/delete-measure.use-case';

@Module({
  imports: [CqrsModule],
  controllers: [SheetMusicRestController],
  providers: [
    SheetMusicFacade,
    AddMeasureUseCase,
    {
      provide: MikroOrmPersistableEventRepository,
      useFactory: (entityManager: EntityManager) =>
        entityManager.getRepository(EventEntity),
      inject: [EntityManager],
    },
    {
      provide: MeasureRepository,
      useClass: MikroOrmMeasureRepository,
    },
    EventEntityMapper,
    {
      provide: EventStore,
      useClass: MikroOrmEventStore,
    },
    {
      provide: Transaction,
      useClass: MikroOrmTransaction,
    },
    AddNoteToMeasureUseCase,
    RemoveNoteFromMeasureUseCase,
    DeleteMeasureUseCase,
  ],
})
export class SheetMusicModule {}
