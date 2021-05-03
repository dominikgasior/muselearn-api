import { QueryHandler } from '@nestjs/cqrs';
import { ShowSheetMusicInVersionQuery } from './query/show-sheet-music-in-version.query';
import { MeasureResponseModel } from './boundary/response-model/measure.response-model';
import { ShowSheetMusicInVersionDataProvider } from './gateway/show-sheet-music-in-version.data-provider';

@QueryHandler(ShowSheetMusicInVersionQuery)
export class ShowSheetMusicInVersionUseCase {
  constructor(
    private readonly dataProvider: ShowSheetMusicInVersionDataProvider,
  ) {}

  async execute(
    query: ShowSheetMusicInVersionQuery,
  ): Promise<MeasureResponseModel[]> {
    return this.dataProvider.provide(query.version);
  }
}
