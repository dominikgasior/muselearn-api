import { MeasureCreated } from '../../domain/event/measure-created';
import { MeasureInVersionProjection } from './measure-in-version.projection';
import { MeasureInVersionRepository } from '../gateway/measure-in-version.repository';
import { Transaction } from '../../../shared/application/gateway/transaction';
import { Injectable } from '@nestjs/common';
import { NoteAddedToMeasure } from '../../domain/event/note-added-to-measure';
import { NoteRemovedFromMeasure } from '../../domain/event/note-removed-from-measure';
import { Uuid } from '../../../shared/domain/uuid';
import { MeasureDeleted } from '../../domain/event/measure-deleted';

@Injectable()
export class MeasureInVersionProjector {
  constructor(
    private readonly repository: MeasureInVersionRepository,
    private readonly transaction: Transaction,
  ) {}

  async applyMeasureCreated(event: MeasureCreated): Promise<void> {
    const projection = MeasureInVersionProjection.applyMeasureCreated(event);

    return this.saveProjection(projection);
  }

  async applyNoteAddedToMeasure(
    event: NoteAddedToMeasure,
    version: number,
  ): Promise<void> {
    const projection = await this.getPreviousVersionOfProjection(
      event.aggregateId,
      version,
    );

    projection.applyNoteAddedToMeasure(event, version);

    return this.saveProjection(projection);
  }

  async applyNoteRemovedFromMeasure(
    event: NoteRemovedFromMeasure,
    version: number,
  ): Promise<void> {
    const projection = await this.getPreviousVersionOfProjection(
      event.aggregateId,
      version,
    );

    projection.applyNoteRemovedFromMeasure(event, version);

    return this.saveProjection(projection);
  }

  async applyMeasureDeleted(
    event: MeasureDeleted,
    version: number,
  ): Promise<void> {
    const projection = await this.getPreviousVersionOfProjection(
      event.aggregateId,
      version,
    );

    projection.applyMeasureDeleted(version);

    return this.saveProjection(projection);
  }

  private async getPreviousVersionOfProjection(
    aggregateId: Uuid,
    version: number,
  ): Promise<MeasureInVersionProjection> {
    return this.repository.get(aggregateId, version - 1);
  }

  private async saveProjection(
    projection: MeasureInVersionProjection,
  ): Promise<void> {
    return this.transaction.run(() => this.repository.save(projection));
  }
}
