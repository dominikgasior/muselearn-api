import { SheetMusicHistoryResponseModel } from '../boundary/response-model/sheet-music-history.response-model';

export abstract class ShowSheetMusicHistoryDataProvider {
  abstract provide(): Promise<SheetMusicHistoryResponseModel[]>;
}
