import { TestingModule } from '@nestjs/testing';
import { setup } from './setup';
import {
  assertNoteAddedToMeasureEventApplied,
  assertUseCaseExecutedSuccessfully,
  assertUseCaseExecutedUnsuccessfully,
  givenEmptyMeasure,
  givenFullMeasure,
  whenAddingQuarterNote,
} from './seed';

describe('Add note to measure use case tests', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await setup();
  });

  it('Should add a quarter note to an empty measure', async () => {
    await givenEmptyMeasure(app);

    const useCaseResult = whenAddingQuarterNote(app);

    await assertUseCaseExecutedSuccessfully(useCaseResult);
    await assertNoteAddedToMeasureEventApplied(app);
  });

  it('Should not add a note to a full measure', async () => {
    await givenFullMeasure(app);

    const useCaseResult = whenAddingQuarterNote(app);

    await assertUseCaseExecutedUnsuccessfully(useCaseResult);
  });
});
