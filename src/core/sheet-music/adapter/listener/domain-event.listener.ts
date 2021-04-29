import { MeasureCreated } from '../../domain/event/measure-created';
import { OnEvent } from '@nestjs/event-emitter';
import { ProjectionService } from '../../application/projection/projection.service';
import { Injectable } from '@nestjs/common';
import { PersistableEvent } from '../../../shared/domain/persistable-event';
import { NoteAddedToMeasure } from '../../domain/event/note-added-to-measure';
import { NoteRemovedFromMeasure } from '../../domain/event/note-removed-from-measure';
import { MeasureDeleted } from '../../domain/event/measure-deleted';

@Injectable()
export class DomainEventListener {
  constructor(private readonly projectionService: ProjectionService) {}

  @OnEvent(MeasureCreated.name, { async: true })
  async onMeasureCreated(event: PersistableEvent): Promise<void> {
    return this.projectionService.applyMeasureCreated(
      event.domainEvent as MeasureCreated,
    );
  }

  @OnEvent(NoteAddedToMeasure.name, { async: true })
  async onNoteAddedToMeasure(event: PersistableEvent): Promise<void> {
    return this.projectionService.applyNoteAddedToMeasure(
      event.domainEvent as NoteAddedToMeasure,
      event.version,
    );
  }

  @OnEvent(NoteRemovedFromMeasure.name, { async: true })
  async onNoteRemovedFromMeasure(event: PersistableEvent): Promise<void> {
    return this.projectionService.applyNoteRemovedFromMeasure(
      event.domainEvent as NoteRemovedFromMeasure,
      event.version,
    );
  }

  @OnEvent(MeasureDeleted.name, { async: true })
  async onMeasureDeleted(event: PersistableEvent): Promise<void> {
    return this.projectionService.applyMeasureDeleted(
      event.domainEvent as MeasureDeleted,
    );
  }
}
