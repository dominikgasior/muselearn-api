import { Test, TestingModule } from '@nestjs/testing';
import {
  Environment,
  SheetMusicModule,
} from '../../../infrastructure/sheet-music.module';

export const setup: () => Promise<TestingModule> = () => {
  return Test.createTestingModule({
    imports: [SheetMusicModule.register(Environment.TESTING)],
  }).compile();
};
