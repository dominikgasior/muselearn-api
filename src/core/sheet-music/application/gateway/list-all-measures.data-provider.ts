import { MeasureResponseModel } from '../boundary/response-model/measure.response-model';

export abstract class ListAllMeasuresDataProvider {
  abstract provide(): Promise<MeasureResponseModel[]>;
}
