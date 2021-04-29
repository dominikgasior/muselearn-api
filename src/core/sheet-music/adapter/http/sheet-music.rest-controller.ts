import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AddMeasureRequestBody } from './request-body/add-measure.request-body';
import { SheetMusicFacade } from '../../application/boundary/sheet-music.facade';
import { AddNoteToMeasureRequestBody } from './request-body/add-note-to-measure.request-body';
import { AddMeasureRequestModel } from '../../application/boundary/request-model/add-measure.request-model';
import { AddNoteToMeasureRequestModel } from '../../application/boundary/request-model/add-note-to-measure.request-model';
import { RemoveNoteFromMeasureRequestBody } from './request-body/remove-note-from-measure.request-body';
import { RemoveNoteFromMeasureRequestModel } from '../../application/boundary/request-model/remove-note-from-measure.request-model';
import { DeleteMeasureRequestBody } from './request-body/delete-measure.request-body';
import { DeleteMeasureRequestModel } from '../../application/boundary/request-model/delete-measure.request-model';
import { SheetMusicHistoryResponseModel } from '../../application/boundary/response-model/sheet-music-history.response-model';

@Controller('sheet-music')
export class SheetMusicRestController {
  constructor(private readonly sheetMusicFacade: SheetMusicFacade) {}

  @Post('measure')
  async addMeasure(@Body() requestBody: AddMeasureRequestBody): Promise<void> {
    return this.sheetMusicFacade.addMeasure(
      new AddMeasureRequestModel(
        requestBody.id,
        requestBody.clefType,
        requestBody.beatsInMeasure,
        requestBody.noteDuration,
      ),
    );
  }

  @Post('measure/note')
  async addNoteToMeasure(
    @Body() requestBody: AddNoteToMeasureRequestBody,
  ): Promise<void> {
    return this.sheetMusicFacade.addNoteToMeasure(
      new AddNoteToMeasureRequestModel(
        requestBody.id,
        requestBody.measureId,
        requestBody.noteDuration,
      ),
    );
  }

  @Delete('measure/note')
  async removeNoteFromMeasure(
    @Body() requestBody: RemoveNoteFromMeasureRequestBody,
  ): Promise<void> {
    return this.sheetMusicFacade.removeNoteFromMeasure(
      new RemoveNoteFromMeasureRequestModel(
        requestBody.id,
        requestBody.measureId,
      ),
    );
  }

  @Delete('measure')
  async deleteMeasure(
    @Body() requestBody: DeleteMeasureRequestBody,
  ): Promise<void> {
    return this.sheetMusicFacade.deleteMeasure(
      new DeleteMeasureRequestModel(requestBody.id),
    );
  }

  @Get()
  async showHistory(): Promise<SheetMusicHistoryResponseModel[]> {
    return this.sheetMusicFacade.showHistory();
  }
}
