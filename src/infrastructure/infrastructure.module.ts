import { Global, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [MikroOrmModule.forRoot(), EventEmitterModule.forRoot()],
})
export class InfrastructureModule {}
