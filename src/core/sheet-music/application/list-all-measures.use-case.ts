import { QueryHandler } from '@nestjs/cqrs';
import { ListAllMeasuresQuery } from './query/list-all-measures.query';
import { MeasureResponseModel } from './boundary/response-model/measure.response-model';
import { ListAllMeasuresDataProvider } from './gateway/list-all-measures.data-provider';

@QueryHandler(ListAllMeasuresQuery)
export class ListAllMeasuresUseCase {
  constructor(private readonly dataProvider: ListAllMeasuresDataProvider) {}

  async execute(query: ListAllMeasuresQuery): Promise<MeasureResponseModel[]> {
    return this.dataProvider.provide();
  }
}
