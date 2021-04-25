import { MeasureCreated } from '../../domain/event/measure-created';
import { MeasureInVersionProjector } from './measure-in-version.projector';
import { Injectable } from '@nestjs/common';
import { NoteAddedToMeasure } from '../../domain/event/note-added-to-measure';
import { NoteRemovedFromMeasure } from '../../domain/event/note-removed-from-measure';
import { MeasureDeleted } from '../../domain/event/measure-deleted';
import { MeasureCurrentProjector } from './measure-current.projector';

@Injectable()
export class ProjectionService {
  constructor(
    private readonly measureInVersionProjector: MeasureInVersionProjector,
    private readonly measureCurrentProjector: MeasureCurrentProjector,
  ) {}

  applyMeasureCreated(event: MeasureCreated): void {
    this.measureInVersionProjector
      .applyMeasureCreated(event)
      .catch(console.error);

    this.measureCurrentProjector
      .applyMeasureCreated(event)
      .catch(console.error);
  }

  applyNoteAddedToMeasure(event: NoteAddedToMeasure, version: number): void {
    this.measureInVersionProjector
      .applyNoteAddedToMeasure(event, version)
      .catch(console.error);

    this.measureCurrentProjector
      .applyNoteAddedToMeasure(event, version)
      .catch(console.error);
  }

  applyNoteRemovedFromMeasure(
    event: NoteRemovedFromMeasure,
    version: number,
  ): void {
    this.measureInVersionProjector
      .applyNoteRemovedFromMeasure(event, version)
      .catch(console.error);

    this.measureCurrentProjector
      .applyNoteRemovedFromMeasure(event, version)
      .catch(console.error);
  }

  applyMeasureDeleted(event: MeasureDeleted, version: number): void {
    this.measureInVersionProjector
      .applyMeasureDeleted(event, version)
      .catch(console.error);

    this.measureCurrentProjector
      .applyMeasureDeleted(event)
      .catch(console.error);
  }
}
