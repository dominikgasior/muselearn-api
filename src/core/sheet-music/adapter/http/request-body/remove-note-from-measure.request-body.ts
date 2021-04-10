import { IsUUID } from 'class-validator';

export class RemoveNoteFromMeasureRequestBody {
  @IsUUID()
  id!: string;

  @IsUUID()
  measureId!: string;
}
