import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
