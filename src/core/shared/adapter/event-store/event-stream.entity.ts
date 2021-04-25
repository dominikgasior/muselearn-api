import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Uuid } from '../../domain/uuid';
import { UuidType } from '../../../../infrastructure/uuid.type';

@Entity({ tableName: 'event_stream' })
export class EventStreamEntity {
  @Property({ type: UuidType })
  private readonly id: Uuid;

  @PrimaryKey({ type: UuidType })
  private readonly aggregateId: Uuid;

  @PrimaryKey()
  public readonly version: number;

  @Property()
  public readonly occurredAt: Date;

  @Property()
  public readonly type: string;

  @Property({ type: 'json' })
  public readonly data: Record<string, unknown>;

  constructor(
    id: Uuid,
    aggregateId: Uuid,
    version: number,
    occurredAt: Date,
    type: string,
    data: Record<string, unknown>,
  ) {
    this.id = id;
    this.aggregateId = aggregateId;
    this.version = version;
    this.occurredAt = occurredAt;
    this.type = type;
    this.data = data;
  }
}
