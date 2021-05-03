import { MeasureResponseModel } from '../boundary/response-model/measure.response-model';

export abstract class ShowSheetMusicInVersionDataProvider {
  abstract provide(version: number): Promise<MeasureResponseModel[]>;
}
