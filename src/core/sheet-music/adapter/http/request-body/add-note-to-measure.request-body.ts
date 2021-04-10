import { IsEnum, IsUUID } from 'class-validator';
import { NoteDurationEnum } from '../../../domain/note-duration.enum';

export class AddNoteToMeasureRequestBody {
  @IsUUID()
  id!: string;

  @IsUUID()
  measureId!: string;

  @IsEnum(NoteDurationEnum)
  noteDuration!: NoteDurationEnum;
}
