import { Note } from './note';

export class MeasureResponseModel {
  constructor(
    public readonly id: string,
    public readonly clefType: string,
    public readonly timeSignature: string,
    public readonly notes: Note[],
  ) {}
}
