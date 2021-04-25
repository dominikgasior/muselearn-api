import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { UuidType } from '../../../../infrastructure/uuid.type';
import { Uuid } from '../../../shared/domain/uuid';

@Entity({ tableName: 'measure_current' })
export class MeasureCurrentEntity {
  @PrimaryKey({ type: UuidType })
  public readonly id: Uuid;

  @Property()
  public readonly version: number;

  @PrimaryKey()
  public readonly aggregateCreatedAt: Date;

  @Property({ type: 'json' })
  public data: Record<string, unknown>;

  constructor(
    id: Uuid,
    version: number,
    aggregateCreatedAt: Date,
    data: Record<string, unknown>,
  ) {
    this.id = id;
    this.version = version;
    this.aggregateCreatedAt = aggregateCreatedAt;
    this.data = data;
  }
}
