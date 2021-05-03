interface Note {
  id: string;
  noteDuration: number;
}

export interface MeasureResponseModelData {
  id: string;
  notes: { [id: string]: Note };
  clefType: string;
  timeSignature: string;
  aggregateCreatedAt: string;
}
