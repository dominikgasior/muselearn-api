import { Injectable } from '@nestjs/common';
import { Transaction } from '../../../../shared/application/gateway/transaction';
import { MeasureCreated } from '../../../domain/event/measure-created';
import { MeasureCurrentProjection } from './measure-current.projection';
import { MeasureCurrentRepository } from '../../gateway/measure-current.repository';
import { NoteAddedToMeasure } from '../../../domain/event/note-added-to-measure';
import { NoteRemovedFromMeasure } from '../../../domain/event/note-removed-from-measure';
import { MeasureDeleted } from '../../../domain/event/measure-deleted';

@Injectable()
export class MeasureCurrentProjector {
  constructor(
    private readonly repository: MeasureCurrentRepository,
    private readonly transaction: Transaction,
  ) {}

  async applyMeasureCreated(event: MeasureCreated): Promise<void> {
    const projection = MeasureCurrentProjection.applyMeasureCreated(event);

    return this.transaction.run(() => this.repository.save(projection));
  }

  async applyNoteAddedToMeasure(
    event: NoteAddedToMeasure,
    version: number,
  ): Promise<void> {
    return this.transaction.run(async () => {
      const projection = await this.repository.get(event.aggregateId);

      projection.applyNoteAddedToMeasure(event, version);

      return this.repository.update(projection);
    });
  }

  async applyNoteRemovedFromMeasure(
    event: NoteRemovedFromMeasure,
    version: number,
  ): Promise<void> {
    return this.transaction.run(async () => {
      const projection = await this.repository.get(event.aggregateId);

      projection.applyNoteRemovedFromMeasure(event, version);

      return this.repository.update(projection);
    });
  }

  async applyMeasureDeleted(event: MeasureDeleted): Promise<void> {
    return this.transaction.run(() =>
      this.repository.delete(event.aggregateId),
    );
  }
}
