import { IsUUID } from 'class-validator';

export class DeleteMeasureRequestBody {
  @IsUUID()
  id!: string;
}
