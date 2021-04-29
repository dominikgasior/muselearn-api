interface Note {
  id: string;
  noteDuration: number;
}

export class MeasureResponseModel {
  constructor(
    public readonly id: string,
    public readonly clefType: string,
    public readonly timeSignature: string,
    public readonly notes: Note[],
  ) {}
}

export class SheetMusicHistoryResponseModel {
  constructor(
    public readonly version: number,
    public readonly type: string,
    public readonly measures: MeasureResponseModel[],
  ) {}
}
