import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { JsonType } from '../../../../../infrastructure/json.type';

@Entity({ tableName: 'sheet_music_in_version' })
export class SheetMusicInVersionEntity {
  @PrimaryKey()
  public readonly version!: number;

  @Property()
  public readonly type: string;

  @Property()
  public readonly occurredAt: Date;

  @Property({ type: JsonType })
  public readonly data: Record<string, unknown>;

  constructor(type: string, occurredAt: Date, data: Record<string, unknown>) {
    this.type = type;
    this.occurredAt = occurredAt;
    this.data = data;
  }
}
