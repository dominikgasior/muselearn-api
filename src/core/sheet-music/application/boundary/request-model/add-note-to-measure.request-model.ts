export class AddNoteToMeasureRequestModel {
  constructor(
    public readonly noteId: string,
    public readonly measureId: string,
    public readonly noteDuration: number,
  ) {}
}
