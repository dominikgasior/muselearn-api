import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class Measure {
  @PrimaryKey()
  id: number;
}
