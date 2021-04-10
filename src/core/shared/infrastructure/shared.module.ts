import { Global, Module } from '@nestjs/common';
import { UuidFactory } from '../domain/uuid.factory';
import { DateFactory } from '../domain/date.factory';

@Global()
@Module({
  providers: [UuidFactory, DateFactory],
  exports: [UuidFactory, DateFactory],
})
export class SharedModule {}
