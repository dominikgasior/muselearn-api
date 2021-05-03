import { AddMeasureCommand } from '../command/add-measure.command';
import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AddNoteToMeasureCommand } from '../command/add-note-to-measure.command';
import { AddMeasureRequestModel } from './request-model/add-measure.request-model';
import { MeasureId } from '../../domain/measure-id';
import { ClefType } from '../../domain/clef-type';
import { TimeSignature } from '../../domain/time-signature';
import { AddNoteToMeasureRequestModel } from './request-model/add-note-to-measure.request-model';
import { NoteId } from '../../domain/note-id';
import { Uuid } from '../../../shared/domain/uuid';
import { NoteDuration } from '../../domain/note-duration';
import { RemoveNoteFromMeasureRequestModel } from './request-model/remove-note-from-measure.request-model';
import { RemoveNoteFromMeasureCommand } from '../command/remove-note-from-measure.command';
import { DeleteMeasureRequestModel } from './request-model/delete-measure.request-model';
import { DeleteMeasureCommand } from '../command/delete-measure.command';
import { ShowSheetMusicHistoryQuery } from '../query/show-sheet-music-history.query';
import { SheetMusicHistoryResponseModel } from './response-model/sheet-music-history.response-model';
import { MeasureResponseModel } from './response-model/measure.response-model';
import { ShowSheetMusicInVersionQuery } from '../query/show-sheet-music-in-version.query';
import { ShowSheetMusicInVersionRequestModel } from './request-model/show-sheet-music-in-version.request-model';
import { ShowCurrentSheetMusicQuery } from '../query/show-current-sheet-music.query';

@Injectable()
export class SheetMusicFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async addMeasure(requestModel: AddMeasureRequestModel): Promise<void> {
    return this.commandBus.execute(
      new AddMeasureCommand(
        new MeasureId(Uuid.create(requestModel.measureId)),
        ClefType.createFromString(requestModel.clefType),
        TimeSignature.create(
          requestModel.beatsInMeasure,
          NoteDuration.create(requestModel.noteDuration),
        ),
      ),
    );
  }

  async addNoteToMeasure(
    requestModel: AddNoteToMeasureRequestModel,
  ): Promise<void> {
    return this.commandBus.execute(
      new AddNoteToMeasureCommand(
        new NoteId(Uuid.create(requestModel.noteId)),
        new MeasureId(Uuid.create(requestModel.measureId)),
        NoteDuration.create(requestModel.noteDuration),
      ),
    );
  }

  async removeNoteFromMeasure(
    requestModel: RemoveNoteFromMeasureRequestModel,
  ): Promise<void> {
    return this.commandBus.execute(
      new RemoveNoteFromMeasureCommand(
        new NoteId(Uuid.create(requestModel.noteId)),
        new MeasureId(Uuid.create(requestModel.measureId)),
      ),
    );
  }

  async deleteMeasure(requestModel: DeleteMeasureRequestModel): Promise<void> {
    return this.commandBus.execute(
      new DeleteMeasureCommand(new MeasureId(Uuid.create(requestModel.id))),
    );
  }

  async showHistory(): Promise<SheetMusicHistoryResponseModel[]> {
    return this.queryBus.execute(new ShowSheetMusicHistoryQuery());
  }

  async showInVersion(
    requestModel: ShowSheetMusicInVersionRequestModel,
  ): Promise<MeasureResponseModel[]> {
    return this.queryBus.execute(
      new ShowSheetMusicInVersionQuery(requestModel.version),
    );
  }

  async showCurrent(): Promise<MeasureResponseModel[]> {
    return this.queryBus.execute(new ShowCurrentSheetMusicQuery());
  }
}
