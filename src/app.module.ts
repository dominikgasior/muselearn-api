import { Module } from '@nestjs/common';
import { SheetMusicModule } from './core/sheet-music/infrastructure/sheet-music.module';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { SharedModule } from './core/shared/infrastructure/shared.module';

@Module({
  imports: [InfrastructureModule, SharedModule, SheetMusicModule],
})
export class AppModule {}
