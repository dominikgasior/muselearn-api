import { validate as uuidValidate } from 'uuid';

export class Uuid {
  private constructor(private readonly id: string) {}

  static create(uuid: string) {
    Uuid.validate(uuid);

    return new Uuid(uuid);
  }

  toString(): string {
    return this.id;
  }

  equals(uuid: Uuid): boolean {
    return uuid.id === this.id;
  }

  private static validate(uuid: string): void {
    if (!uuidValidate(uuid)) {
      throw new Error(`Given uuid ${uuid} is invalid`);
    }
  }
}
