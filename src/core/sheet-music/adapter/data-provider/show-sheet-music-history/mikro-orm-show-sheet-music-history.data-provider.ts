import { ShowSheetMusicHistoryDataProvider } from '../../../application/gateway/show-sheet-music-history.data-provider';
import {
  MeasureResponseModel,
  SheetMusicHistoryResponseModel,
} from '../../../application/boundary/response-model/sheet-music-history.response-model';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { SheetMusicInVersionEntity } from '../../repository/sheet-music-in-version/sheet-music-in-version.entity';

interface QueryResult {
  version: number;
  type: string;
  data: { measures: { [id: string]: MeasureResponseModelData } };
}

interface MeasureResponseModelData {
  id: string;
  notes: { [id: string]: Note };
  clefType: string;
  timeSignature: string;
  aggregateCreatedAt: string;
}

interface Note {
  id: string;
  noteDuration: number;
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
