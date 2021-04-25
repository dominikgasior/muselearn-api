import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { Uuid } from '../../../shared/domain/uuid';
import { UuidType } from '../../../../infrastructure/uuid.type';

@Entity({ tableName: 'measure_in_version' })
export class MeasureInVersionEntity {
  @PrimaryKey({ type: UuidType })
  public readonly id: Uuid;

  @PrimaryKey()
  public readonly version: number;

  @Property()
  public readonly aggregateCreatedAt: Date;

  @Property({ type: 'json' })
  public readonly data: Record<string, unknown>;

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
