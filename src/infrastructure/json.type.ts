import { Type } from '@mikro-orm/core';

export class JsonType extends Type<string, string> {
  getColumnType() {
    return 'json';
  }
}
