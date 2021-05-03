import { MeasureResponseModel } from '../boundary/response-model/measure.response-model';

export abstract class ShowCurrentSheetMusicDataProvider {
  abstract provide(): Promise<MeasureResponseModel[]>;
}
