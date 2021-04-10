import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Uuid } from '../../domain/uuid';
import { UuidType } from '../../../../infrastructure/uuid.type';

@Entity({ tableName: 'event_stream' })
export class EventEntity {
  @Property({ type: UuidType })
  private readonly id: Uuid;

  @PrimaryKey({ type: UuidType })
  private readonly aggregateId: Uuid;

  @PrimaryKey()
  public readonly version: number;

  @Property()
  public readonly occurredAt: Date;

  @Property({ type: 'json' })
  public readonly data: Record<string, unknown>;

  constructor(
    id: Uuid,
    aggregateId: Uuid,
    version: number,
    occurredAt: Date,
    data: Record<string, unknown>,
  ) {
    this.id = id;
    this.aggregateId = aggregateId;
    this.version = version;
    this.occurredAt = occurredAt;
    this.data = data;
  }
}
