import { ShowSheetMusicInVersionDataProvider } from '../../../application/gateway/show-sheet-music-in-version.data-provider';
import { MeasureResponseModel } from '../../../application/boundary/response-model/measure.response-model';
import { Injectable } from '@nestjs/common';
import { SheetMusicInVersionEntity } from '../../repository/sheet-music-in-version/sheet-music-in-version.entity';
import { MeasureResponseModelData } from '../measure-response-model-data';
import { EntityManager } from '@mikro-orm/postgresql';

interface QueryResult {
  data: { measures: { [id: string]: MeasureResponseModelData } };
}

@Injectable()
export class MikroOrmShowSheetMusicInVersionDataProvider
  implements ShowSheetMusicInVersionDataProvider {
  constructor(private readonly entityManager: EntityManager) {}

  async provide(version: number): Promise<MeasureResponseModel[]> {
    const result = await this.getQueryResults(version);

    if (result === null) {
      return [];
    }

    return this.map(result);
  }

  private getQueryResults(version: number): Promise<QueryResult | null> {
    return this.entityManager
      .createQueryBuilder(SheetMusicInVersionEntity)
      .select('data')
      .where({ version })
      .execute('get');
  }

  private map(result: QueryResult): MeasureResponseModel[] {
    return Object.values(result.data.measures).map(
      (data) =>
        new MeasureResponseModel(
          data.id,
          data.clefType,
          data.timeSignature,
          Object.values(data.notes),
        ),
    );
  }
}
