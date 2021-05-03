import { ShowSheetMusicHistoryDataProvider } from '../../../application/gateway/show-sheet-music-history.data-provider';
import { SheetMusicHistoryResponseModel } from '../../../application/boundary/response-model/sheet-music-history.response-model';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { SheetMusicInVersionEntity } from '../../repository/sheet-music-in-version/sheet-music-in-version.entity';
import { MeasureResponseModelData } from '../measure-response-model-data';

interface QueryResult {
  version: number;
  type: string;
  data: { measures: { [id: string]: MeasureResponseModelData } };
}

@Injectable()
export class MikroOrmShowSheetMusicHistoryDataProvider
  implements ShowSheetMusicHistoryDataProvider {
  constructor(private readonly entityManager: EntityManager) {}

  async provide(): Promise<SheetMusicHistoryResponseModel[]> {
    const results: QueryResult[] = await this.getQueryResults();

    return results.map((result) =>
      MikroOrmShowSheetMusicHistoryDataProvider.map(result),
    );
  }

  private getQueryResults(): Promise<QueryResult[]> {
    return this.entityManager
      .createQueryBuilder(SheetMusicInVersionEntity)
      .select(['version', 'type'])
      .orderBy({ version: 'ASC' })
      .execute();
  }

  private static map(result: QueryResult): SheetMusicHistoryResponseModel {
    return new SheetMusicHistoryResponseModel(result.version, result.type);
  }
}
