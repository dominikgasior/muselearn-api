import { Module } from '@nestjs/common';
import {
  Environment,
  SheetMusicModule,
} from './core/sheet-music/infrastructure/sheet-music.module';

@Module({
  imports: [SheetMusicModule.register(Environment.PRODUCTION)],
})
export class AppModule {}
