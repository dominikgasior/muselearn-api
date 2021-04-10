import { DomainEvent } from '../../../shared/domain/domain-event';
import { Uuid } from '../../../shared/domain/uuid';
import { ClefType } from '../clef-type';
import { TimeSignature } from '../time-signature';
import { Type } from 'class-transformer';

export class MeasureCreated extends DomainEvent {
  @Type(() => ClefType)
  public readonly clefType: ClefType;

  @Type(() => TimeSignature)
  public readonly timeSignature: TimeSignature;

  constructor(
    aggregateId: Uuid,
    occurredAt: Date,
    clefType: ClefType,
    timeSignature: TimeSignature,
  ) {
    super(aggregateId, occurredAt);
    this.clefType = clefType;
    this.timeSignature = timeSignature;
  }
}
