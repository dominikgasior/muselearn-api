import { Uuid } from '../../shared/domain/uuid';
import { Type } from 'class-transformer';

export class NoteId {
  @Type(() => Uuid)
  public readonly uuid: Uuid;

  constructor(uuid: Uuid) {
    this.uuid = uuid;
  }
}
