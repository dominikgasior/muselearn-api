export abstract class Projection {
  public isDeleted = false;

  protected constructor(public version: number) {}
}
