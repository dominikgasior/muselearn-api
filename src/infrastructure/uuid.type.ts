import { Type, ValidationError } from '@mikro-orm/core';
import { Uuid } from '../core/shared/domain/uuid';

export class UuidType extends Type<Uuid, string> {
  convertToDatabaseValue(value: Uuid | string | undefined): string {
    if (value instanceof Uuid) {
      return value.toString();
    }

    if (value !== undefined) {
      return value;
    }

    throw ValidationError.invalidType(UuidType, value, 'JS');
  }

  convertToJSValue(value: Uuid | string | undefined): Uuid {
    if (value instanceof Uuid) {
      return value;
    }

    if (value !== undefined) {
      return Uuid.create(value);
    }

    throw ValidationError.invalidType(UuidType, value, 'database');
  }

  getColumnType() {
    return 'uuid';
  }
}
