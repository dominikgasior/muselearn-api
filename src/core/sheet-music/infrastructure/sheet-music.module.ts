import { Module } from '@nestjs/common';
import { SheetMusicRestController } from '../adapter/http/sheet-music.rest-controller';
import { SheetMusicFacade } from '../application/boundary/sheet-music.facade';
import { AddMeasureUseCase } from '../application/add-measure.use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmEventStreamEntityRepository } from '../../shared/adapter/event-store/mikro-orm-event-stream-entity.repository';
import { EntityManager } from '@mikro-orm/core';
import { EventStreamEntity } from '../../shared/adapter/event-store/event-stream.entity';
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
import { DomainEventListener } from '../adapter/listener/domain-event.listener';
import { DomainEventPublisher } from '../application/gateway/domain-event.publisher';
import { EventEmitterDomainEventPublisher } from '../adapter/domain-event-publisher/event-emitter.domain-event-publisher';
import { ProjectionService } from '../application/projection/projection.service';
import { MeasureInVersionProjector } from '../application/projection/measure-in-version.projector';
import { MikroOrmMeasureInVersionRepository } from '../adapter/repository/mikro-orm-measure-in-version.repository';
import { MeasureInVersionRepository } from '../application/gateway/measure-in-version.repository';
import { MeasureInVersionEntityMapper } from '../adapter/repository/measure-in-version-entity.mapper';
import { MikroOrmMeasureInVersionEntityRepository } from '../adapter/repository/mikro-orm-measure-in-version-entity.repository';
import { MeasureInVersionEntity } from '../adapter/repository/measure-in-version.entity';
import { MeasureCurrentProjector } from '../application/projection/measure-current.projector';
import { MeasureCurrentRepository } from '../application/gateway/measure-current.repository';
import { MikroOrmMeasureCurrentRepository } from '../adapter/repository/mikro-orm-measure-current.repository';
import { MikroOrmMeasureCurrentEntityRepository } from '../adapter/repository/mikro-orm-measure-current-entity.repository';
import { MeasureCurrentEntity } from '../adapter/repository/measure-current.entity';
import { MeasureCurrentEntityMapper } from '../adapter/repository/measure-current-entity.mapper';
import { ListAllMeasuresUseCase } from '../application/list-all-measures.use-case';
import { ListAllMeasuresDataProvider } from '../application/gateway/list-all-measures.data-provider';
import { MikroOrmListAllMeasuresDataProvider } from '../adapter/data-provider/list-all-measures/mikro-orm-list-all-measures.data-provider';

@Module({
  imports: [CqrsModule],
  controllers: [SheetMusicRestController],
  providers: [
    SheetMusicFacade,
    AddMeasureUseCase,
    {
      provide: MikroOrmEventStreamEntityRepository,
      useFactory: (entityManager: EntityManager) =>
        entityManager.getRepository(EventStreamEntity),
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
    {
      provide: DomainEventPublisher,
      useClass: EventEmitterDomainEventPublisher,
    },
    ProjectionService,
    MeasureInVersionProjector,
    {
      provide: MeasureInVersionRepository,
      useClass: MikroOrmMeasureInVersionRepository,
    },
    DomainEventListener,
    MeasureInVersionEntityMapper,
    {
      provide: MikroOrmMeasureInVersionEntityRepository,
      useFactory: (entityManager: EntityManager) =>
        entityManager.getRepository(MeasureInVersionEntity),
      inject: [EntityManager],
    },
    MeasureCurrentProjector,
    {
      provide: MeasureCurrentRepository,
      useClass: MikroOrmMeasureCurrentRepository,
    },
    {
      provide: MikroOrmMeasureCurrentEntityRepository,
      useFactory: (entityManager: EntityManager) =>
        entityManager.getRepository(MeasureCurrentEntity),
      inject: [EntityManager],
    },
    MeasureCurrentEntityMapper,
    ListAllMeasuresUseCase,
    {
      provide: ListAllMeasuresDataProvider,
      useClass: MikroOrmListAllMeasuresDataProvider,
    },
  ],
})
export class SheetMusicModule {}
