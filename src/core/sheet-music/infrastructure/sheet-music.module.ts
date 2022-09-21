import { DynamicModule, Module } from '@nestjs/common';
import { SheetMusicRestController } from '../adapter/http/sheet-music.rest-controller';
import { SheetMusicFacade } from '../application/boundary/sheet-music.facade';
import { AddMeasureUseCase } from '../application/add-measure.use-case';
import { CqrsModule } from '@nestjs/cqrs';
import { MikroOrmEventStreamEntityRepository } from '../../shared/adapter/event-store/mikro-orm-event-stream-entity.repository';
import { EntityManager } from '@mikro-orm/core';
import { EventStreamEntity } from '../../shared/adapter/event-store/event-stream.entity';
import { EventStore } from '../../shared/adapter/event-store/event-store';
import { MeasureRepository } from '../application/gateway/measure.repository';
import { MikroOrmMeasureRepository } from '../adapter/repository/measure/mikro-orm-measure.repository';
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
import { SheetMusicInVersionProjector } from '../application/projection/sheet-music-in-version/sheet-music-in-version.projector';
import { MikroOrmSheetMusicInVersionRepository } from '../adapter/repository/sheet-music-in-version/mikro-orm-sheet-music-in-version.repository';
import { SheetMusicInVersionRepository } from '../application/gateway/sheet-music-in-version.repository';
import { SheetMusicInVersionEntityMapper } from '../adapter/repository/sheet-music-in-version/sheet-music-in-version-entity.mapper';
import { MikroOrmSheetMusicInVersionEntityRepository } from '../adapter/repository/sheet-music-in-version/mikro-orm-sheet-music-in-version-entity.repository';
import { SheetMusicInVersionEntity } from '../adapter/repository/sheet-music-in-version/sheet-music-in-version.entity';
import { MeasureCurrentProjector } from '../application/projection/measure-current/measure-current.projector';
import { MeasureCurrentRepository } from '../application/gateway/measure-current.repository';
import { MikroOrmMeasureCurrentRepository } from '../adapter/repository/measure-current/mikro-orm-measure-current.repository';
import { MikroOrmMeasureCurrentEntityRepository } from '../adapter/repository/measure-current/mikro-orm-measure-current-entity.repository';
import { MeasureCurrentEntity } from '../adapter/repository/measure-current/measure-current.entity';
import { MeasureCurrentEntityMapper } from '../adapter/repository/measure-current/measure-current-entity.mapper';
import { ShowSheetMusicHistoryUseCase } from '../application/show-sheet-music-history.use-case';
import { ShowSheetMusicHistoryDataProvider } from '../application/gateway/show-sheet-music-history.data-provider';
import { MikroOrmShowSheetMusicHistoryDataProvider } from '../adapter/data-provider/show-sheet-music-history/mikro-orm-show-sheet-music-history.data-provider';
import { ShowSheetMusicInVersionUseCase } from '../application/show-sheet-music-in-version.use-case';
import { ShowSheetMusicInVersionDataProvider } from '../application/gateway/show-sheet-music-in-version.data-provider';
import { MikroOrmShowSheetMusicInVersionDataProvider } from '../adapter/data-provider/show-sheet-music-in-version/mikro-orm-show-sheet-music-in-version.data-provider';
import { ShowCurrentSheetMusicUseCase } from '../application/show-current-sheet-music.use-case';
import { ShowCurrentSheetMusicDataProvider } from '../application/gateway/show-current-sheet-music.data-provider';
import { MikroOrmShowCurrentSheetMusicDataProvider } from '../adapter/data-provider/show-current-sheet-music/mikro-orm-show-current-sheet-music.data-provider';
import { InMemoryMeasureRepository } from '../adapter/repository/measure/in-memory-measure.repository';
import { SharedModule } from '../../shared/infrastructure/shared.module';
import { InfrastructureModule } from '../../../infrastructure/infrastructure.module';
import { DirectExecutionTransaction } from '../../shared/adapter/transaction/direct-execution.transaction';
import { MockedDomainEventPublisher } from '../adapter/domain-event-publisher/mocked.domain-event-publisher';

export enum Environment {
  TESTING,
  PRODUCTION,
}

@Module({})
export class SheetMusicModule {
  static register(environment: Environment): DynamicModule {
    return {
      module: SheetMusicModule,
      imports: [CqrsModule, SharedModule, InfrastructureModule],
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
          useClass:
            environment === Environment.PRODUCTION
              ? MikroOrmMeasureRepository
              : InMemoryMeasureRepository,
        },
        EventEntityMapper,
        {
          provide: EventStore,
          useClass: MikroOrmEventStore,
        },
        {
          provide: Transaction,
          useClass:
            environment === Environment.PRODUCTION
              ? MikroOrmTransaction
              : DirectExecutionTransaction,
        },
        AddNoteToMeasureUseCase,
        RemoveNoteFromMeasureUseCase,
        DeleteMeasureUseCase,
        {
          provide: DomainEventPublisher,
          useClass:
            environment === Environment.PRODUCTION
              ? EventEmitterDomainEventPublisher
              : MockedDomainEventPublisher,
        },
        ProjectionService,
        SheetMusicInVersionProjector,
        {
          provide: SheetMusicInVersionRepository,
          useClass: MikroOrmSheetMusicInVersionRepository,
        },
        DomainEventListener,
        SheetMusicInVersionEntityMapper,
        {
          provide: MikroOrmSheetMusicInVersionEntityRepository,
          useFactory: (entityManager: EntityManager) =>
            entityManager.getRepository(SheetMusicInVersionEntity),
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
        ShowSheetMusicHistoryUseCase,
        {
          provide: ShowSheetMusicHistoryDataProvider,
          useClass: MikroOrmShowSheetMusicHistoryDataProvider,
        },
        ShowSheetMusicInVersionUseCase,
        {
          provide: ShowSheetMusicInVersionDataProvider,
          useClass: MikroOrmShowSheetMusicInVersionDataProvider,
        },
        ShowCurrentSheetMusicUseCase,
        {
          provide: ShowCurrentSheetMusicDataProvider,
          useClass: MikroOrmShowCurrentSheetMusicDataProvider,
        },
      ],
    };
  }
}
