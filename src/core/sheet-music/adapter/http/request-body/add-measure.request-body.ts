import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { ClefTypeEnum } from '../../../domain/clef-type.enum';
import { NoteDurationEnum } from '../../../domain/note-duration.enum';

export class AddMeasureRequestBody {
  @IsUUID()
  id!: string;

  @IsEnum(ClefTypeEnum)
  clefType!: ClefTypeEnum;

  @IsNumber()
  beatsInMeasure!: number;

  @IsEnum(NoteDurationEnum)
  noteDuration!: NoteDurationEnum;
}
