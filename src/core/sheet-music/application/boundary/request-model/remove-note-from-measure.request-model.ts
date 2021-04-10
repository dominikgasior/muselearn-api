export class RemoveNoteFromMeasureRequestModel {
  constructor(
    public readonly noteId: string,
    public readonly measureId: string,
  ) {}
}
