import { MeasureRepository } from '../../application/gateway/measure.repository';
import { Measure } from '../../domain/measure';
import { EventStore } from '../../../shared/adapter/event-store/event-store';
import { Injectable } from '@nestjs/common';
import { MeasureId } from '../../domain/measure-id';

@Injectable()
export class MikroOrmMeasureRepository implements MeasureRepository {
  constructor(private readonly eventStore: EventStore) {}

  async save(measure: Measure): Promise<void> {
    const pendingDomainEventStream = measure.getPendingDomainEventStream();

    this.eventStore.append(pendingDomainEventStream);
  }

  async get(id: MeasureId): Promise<Measure> {
    const domainEventStream = await this.eventStore.load(id.uuid);

    return Measure.createFromDomainEventStream(domainEventStream);
  }
}
