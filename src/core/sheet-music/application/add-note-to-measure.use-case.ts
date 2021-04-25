import { CommandHandler } from '@nestjs/cqrs';
import { AddNoteToMeasureCommand } from './command/add-note-to-measure.command';
import { MeasureRepository } from './gateway/measure.repository';
import { Transaction } from '../../shared/application/gateway/transaction';
import { DateFactory } from '../../shared/domain/date.factory';
import { DomainEventPublisher } from './gateway/domain-event.publisher';

@CommandHandler(AddNoteToMeasureCommand)
export class AddNoteToMeasureUseCase {
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly transaction: Transaction,
    private readonly dateFactory: DateFactory,
    private readonly domainEventPublisher: DomainEventPublisher,
  ) {}

  async execute(command: AddNoteToMeasureCommand): Promise<void> {
    const measure = await this.measureRepository.get(command.measureId);

    measure.addNote(command.id, command.noteDuration, this.dateFactory.now());

    const domainEventStream = measure.getPendingDomainEventStream().copy();

    await this.transaction.run(() => this.measureRepository.save(measure));

    this.domainEventPublisher.publish(domainEventStream);
  }
}
