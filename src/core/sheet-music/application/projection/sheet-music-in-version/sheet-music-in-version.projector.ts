import { MeasureCreated } from '../../../domain/event/measure-created';
import { SheetMusicInVersionRepository } from '../../gateway/sheet-music-in-version.repository';
import { Transaction } from '../../../../shared/application/gateway/transaction';
import { Injectable } from '@nestjs/common';
import { NoteAddedToMeasure } from '../../../domain/event/note-added-to-measure';
import { NoteRemovedFromMeasure } from '../../../domain/event/note-removed-from-measure';
import { MeasureDeleted } from '../../../domain/event/measure-deleted';

@Injectable()
export class SheetMusicInVersionProjector {
  constructor(
    private readonly repository: SheetMusicInVersionRepository,
    private readonly transaction: Transaction,
  ) {}

  async applyMeasureCreated(event: MeasureCreated): Promise<void> {
    return this.transaction.run(async () => {
      const projection = await this.repository.getPrevious();

      projection.applyMeasureCreated(event);

      return this.repository.save(
        projection,
        event.constructor.name,
        event.occurredAt,
      );
    });
  }

  async applyNoteAddedToMeasure(event: NoteAddedToMeasure): Promise<void> {
    return this.transaction.run(async () => {
      const projection = await this.repository.getPrevious();

      projection.applyNoteAddedToMeasure(event);

      return this.repository.save(
        projection,
        event.constructor.name,
        event.occurredAt,
      );
    });
  }

  async applyNoteRemovedFromMeasure(
    event: NoteRemovedFromMeasure,
  ): Promise<void> {
    return this.transaction.run(async () => {
      const projection = await this.repository.getPrevious();

      projection.applyNoteRemovedFromMeasure(event);

      return this.repository.save(
        projection,
        event.constructor.name,
        event.occurredAt,
      );
    });
  }

  async applyMeasureDeleted(event: MeasureDeleted): Promise<void> {
    return this.transaction.run(async () => {
      const projection = await this.repository.getPrevious();

      projection.applyMeasureDeleted(event);

      return this.repository.save(
        projection,
        event.constructor.name,
        event.occurredAt,
      );
    });
  }
}
