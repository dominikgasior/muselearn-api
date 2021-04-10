import { Uuid } from './uuid';
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UuidFactory {
  generateRandom(): Uuid {
    return Uuid.create(uuidv4());
  }
}
