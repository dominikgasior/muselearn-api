import { ShowSheetMusicHistoryDataProvider } from '../../../application/gateway/show-sheet-music-history.data-provider';
import { SheetMusicHistoryResponseModel } from '../../../application/boundary/response-model/sheet-music-history.response-model';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { SheetMusicInVersionEntity } from '../../repository/sheet-music-in-version/sheet-music-in-version.entity';
import { MeasureResponseModel } from '../../../application/boundary/response-model/measure.response-model';
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

    return results.map((result) => this.map(result));
  }

  private getQueryResults(): Promise<QueryResult[]> {
    return this.entityManager
      .createQueryBuilder(SheetMusicInVersionEntity)
      .select(['version', 'type', 'data'])
      .orderBy({ version: 'ASC' })
      .execute();
  }

  private map(result: QueryResult): SheetMusicHistoryResponseModel {
    const measures = Object.values(result.data.measures).map(
      (data) =>
        new MeasureResponseModel(
          data.id,
          data.clefType,
          data.timeSignature,
          Object.values(data.notes),
        ),
    );

    return new SheetMusicHistoryResponseModel(
      result.version,
      result.type,
      measures,
    );
  }
}
