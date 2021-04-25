import { ListAllMeasuresDataProvider } from '../../../application/gateway/list-all-measures.data-provider';
import { MeasureResponseModel } from '../../../application/boundary/response-model/measure.response-model';
import { EntityManager } from '@mikro-orm/postgresql';
import { MeasureCurrentEntity } from '../../repository/measure-current.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MikroOrmListAllMeasuresDataProvider
  implements ListAllMeasuresDataProvider {
  constructor(private readonly entityManager: EntityManager) {}

  async provide(): Promise<MeasureResponseModel[]> {
    const result: Array<{
      data: MeasureResponseModel;
    }> = await this.entityManager
      .createQueryBuilder(MeasureCurrentEntity)
      .select('data')
      .orderBy({ aggregateCreatedAt: 'ASC' })
      .execute();

    return result.map((row) => row.data);
  }
}
