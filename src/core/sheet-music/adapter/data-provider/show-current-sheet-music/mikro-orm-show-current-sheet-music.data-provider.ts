import { ShowCurrentSheetMusicDataProvider } from '../../../application/gateway/show-current-sheet-music.data-provider';
import { MeasureResponseModel } from '../../../application/boundary/response-model/measure.response-model';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { MeasureResponseModelData } from '../measure-response-model-data';
import { MeasureCurrentEntity } from '../../repository/measure-current/measure-current.entity';

interface QueryResult {
  data: MeasureResponseModelData;
}

@Injectable()
export class MikroOrmShowCurrentSheetMusicDataProvider
  implements ShowCurrentSheetMusicDataProvider {
  constructor(private readonly entityManager: EntityManager) {}

  async provide(): Promise<MeasureResponseModel[]> {
    const results: QueryResult[] = await this.getQueryResults();

    return results.map((result) =>
      MikroOrmShowCurrentSheetMusicDataProvider.map(result),
    );
  }

  private getQueryResults(): Promise<QueryResult[]> {
    return this.entityManager
      .createQueryBuilder(MeasureCurrentEntity)
      .select('data')
      .orderBy({ aggregateCreatedAt: 'ASC' })
      .execute();
  }

  private static map(result: QueryResult): MeasureResponseModel {
    const data = result.data;

    return new MeasureResponseModel(
      data.id,
      data.clefType,
      data.timeSignature,
      Object.values(data.notes),
    );
  }
}
