import { Uuid } from './uuid';
import { Type } from 'class-transformer';

export abstract class DomainEvent {
  @Type(() => Uuid)
  public readonly aggregateId: Uuid;

  @Type(() => Date)
  public readonly occurredAt: Date;

  constructor(aggregateId: Uuid, occurredAt: Date) {
    this.aggregateId = aggregateId;
    this.occurredAt = occurredAt;
  }
}
