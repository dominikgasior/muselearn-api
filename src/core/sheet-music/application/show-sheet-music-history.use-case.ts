import { QueryHandler } from '@nestjs/cqrs';
import { ShowSheetMusicHistoryQuery } from './query/show-sheet-music-history.query';
import { SheetMusicHistoryResponseModel } from './boundary/response-model/sheet-music-history.response-model';
import { ShowSheetMusicHistoryDataProvider } from './gateway/show-sheet-music-history.data-provider';

@QueryHandler(ShowSheetMusicHistoryQuery)
export class ShowSheetMusicHistoryUseCase {
  constructor(
    private readonly dataProvider: ShowSheetMusicHistoryDataProvider,
  ) {}

  async execute(
    query: ShowSheetMusicHistoryQuery,
  ): Promise<SheetMusicHistoryResponseModel[]> {
    return this.dataProvider.provide();
  }
}
