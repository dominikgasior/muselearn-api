import { MeasureResponseModel } from './measure.response-model';

export class SheetMusicHistoryResponseModel {
  constructor(
    public readonly version: number,
    public readonly type: string,
    public readonly measures: MeasureResponseModel[],
  ) {}
}
