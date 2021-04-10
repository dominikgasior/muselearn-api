export class AddMeasureRequestModel {
  constructor(
    public readonly measureId: string,
    public readonly clefType: string,
    public readonly beatsInMeasure: number,
    public readonly noteDuration: number,
  ) {}
}
