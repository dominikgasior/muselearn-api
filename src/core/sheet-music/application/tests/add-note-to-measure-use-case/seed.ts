import { TestingModule } from '@nestjs/testing';
import { MeasureRepository } from '../../gateway/measure.repository';
import { MeasureId } from '../../../domain/measure-id';
import { Uuid } from '../../../../shared/domain/uuid';
import { AddNoteToMeasureCommand } from '../../command/add-note-to-measure.command';
import { NoteId } from '../../../domain/note-id';
import { NoteDuration } from '../../../domain/note-duration';
import { NoteDurationEnum } from '../../../domain/note-duration.enum';
import { AddNoteToMeasureUseCase } from '../../add-note-to-measure.use-case';
import { Measure } from '../../../domain/measure';
import { ClefType } from '../../../domain/clef-type';
import { ClefTypeEnum } from '../../../domain/clef-type.enum';
import { TimeSignature } from '../../../domain/time-signature';
import { NoteAddedToMeasure } from '../../../domain/event/note-added-to-measure';
import { DomainEventStream } from '../../../../shared/domain/domain-event-stream';
import { PersistableEvent } from '../../../../shared/domain/persistable-event';
import { MeasureCreated } from '../../../domain/event/measure-created';

export const getMeasureId = () => {
  return new MeasureId(Uuid.create('04a9cce3-f061-431f-8d37-b0e7b46d0c2d'));
};

export const givenEmptyMeasure = (app: TestingModule) => {
  return app
    .get(MeasureRepository)
    .save(
      Measure.createEmpty(
        getMeasureId(),
        new ClefType(ClefTypeEnum.Treble),
        TimeSignature.create(4, new NoteDuration(NoteDurationEnum.QuarterNote)),
        new Date(),
      ),
    );
};

export const givenFullMeasure = (app: TestingModule) => {
  return app
    .get(MeasureRepository)
    .save(
      Measure.createFromDomainEventStream(
        new DomainEventStream([
          new PersistableEvent(
            1,
            new MeasureCreated(
              getMeasureId().uuid,
              new Date(),
              new ClefType(ClefTypeEnum.Treble),
              TimeSignature.create(
                4,
                new NoteDuration(NoteDurationEnum.QuarterNote),
              ),
            ),
          ),
          new PersistableEvent(
            2,
            new NoteAddedToMeasure(
              getMeasureId().uuid,
              new Date(),
              new NoteId(Uuid.create('ed9f4ae3-23fb-4610-96b0-19974667b41b')),
              new NoteDuration(NoteDurationEnum.WholeNote),
            ),
          ),
        ]),
      ),
    );
};

export const whenAddingQuarterNote = (app: TestingModule) => {
  return app
    .get(AddNoteToMeasureUseCase)
    .execute(
      new AddNoteToMeasureCommand(
        new NoteId(Uuid.create('4b003ba3-c4b8-47a1-88b9-bd80db077fac')),
        getMeasureId(),
        new NoteDuration(NoteDurationEnum.QuarterNote),
      ),
    );
};

export const assertUseCaseExecutedSuccessfully = (
  useCaseResult: Promise<void>,
) => {
  return expect(useCaseResult).resolves.not.toThrow();
};

export const assertUseCaseExecutedUnsuccessfully = (
  useCaseResult: Promise<void>,
) => {
  return expect(useCaseResult).rejects.toThrow();
};

export const assertNoteAddedToMeasureEventApplied = async (
  app: TestingModule,
) => {
  const measure = await app.get(MeasureRepository).get(getMeasureId());

  const events = measure.getPendingDomainEventStream().collect();

  expect(events[1].domainEvent).toBeInstanceOf(NoteAddedToMeasure);
};
