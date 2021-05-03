import { QueryHandler } from '@nestjs/cqrs';
import { ShowCurrentSheetMusicQuery } from './query/show-current-sheet-music.query';
import { MeasureResponseModel } from './boundary/response-model/measure.response-model';
import { ShowCurrentSheetMusicDataProvider } from './gateway/show-current-sheet-music.data-provider';

@QueryHandler(ShowCurrentSheetMusicQuery)
export class ShowCurrentSheetMusicUseCase {
  constructor(
    private readonly dataProvider: ShowCurrentSheetMusicDataProvider,
  ) {}

  async execute(): Promise<MeasureResponseModel[]> {
    return this.dataProvider.provide();
  }
}
