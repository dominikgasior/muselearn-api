export interface MeasureResponseModel {
  id: string;
  notes: { [uuid: string]: { id: string; noteDuration: number } };
  version: number;
  clefType: string;
  isDeleted: boolean;
  timeSignature: string;
  aggregateCreatedAt: string;
}
