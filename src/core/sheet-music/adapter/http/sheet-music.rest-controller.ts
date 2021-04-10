import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AddMeasureRequestBody } from './request-body/add-measure.request-body';
import { SheetMusicFacade } from '../../application/boundary/sheet-music.facade';
import { AddNoteToMeasureRequestBody } from './request-body/add-note-to-measure.request-body';
import { AddMeasureRequestModel } from '../../application/boundary/request-model/add-measure.request-model';
import { AddNoteToMeasureRequestModel } from '../../application/boundary/request-model/add-note-to-measure.request-model';
import { RemoveNoteFromMeasureRequestBody } from './request-body/remove-note-from-measure.request-body';
import { RemoveNoteFromMeasureRequestModel } from '../../application/boundary/request-model/remove-note-from-measure.request-model';
import { DeleteMeasureRequestBody } from './request-body/delete-measure.request-body';
import { DeleteMeasureRequestModel } from '../../application/boundary/request-model/delete-measure.request-model';

@Controller('sheet-music/measure')
export class SheetMusicRestController {
  constructor(private readonly sheetMusicFacade: SheetMusicFacade) {}

  @Post()
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

  @Post('note')
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

  @Delete('note')
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

  @Delete()
  async deleteMeasure(
    @Body() requestBody: DeleteMeasureRequestBody,
  ): Promise<void> {
    return this.sheetMusicFacade.deleteMeasure(
      new DeleteMeasureRequestModel(requestBody.id),
    );
  }
}
