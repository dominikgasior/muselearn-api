import { MeasureRepository } from '../../../application/gateway/measure.repository';
import { Injectable } from '@nestjs/common';
import { MeasureId } from '../../../domain/measure-id';
import { Measure } from '../../../domain/measure';

@Injectable()
export class InMemoryMeasureRepository implements MeasureRepository {
  private readonly database = new Map<string, Measure>();

  async get(id: MeasureId): Promise<Measure> {
    const measure = this.database.get(id.uuid.toString());

    if (measure === undefined) {
      throw new Error(`Measure with id ${id.uuid.toString()} not found`);
    }

    return measure;
  }

  async save(measure: Measure): Promise<void> {
    this.database.set(measure.getId().uuid.toString(), measure);
  }
}
