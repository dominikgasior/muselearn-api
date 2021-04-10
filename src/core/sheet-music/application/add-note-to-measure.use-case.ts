import { CommandHandler } from '@nestjs/cqrs';
import { AddNoteToMeasureCommand } from './command/add-note-to-measure.command';
import { MeasureRepository } from './gateway/measure.repository';
import { Transaction } from '../../shared/application/gateway/transaction';
import { DateFactory } from '../../shared/domain/date.factory';

@CommandHandler(AddNoteToMeasureCommand)
export class AddNoteToMeasureUseCase {
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly transaction: Transaction,
    private readonly dateFactory: DateFactory,
  ) {}

  async execute(command: AddNoteToMeasureCommand): Promise<void> {
    const measure = await this.measureRepository.get(command.measureId);

    measure.addNote(command.id, command.noteDuration, this.dateFactory.now());

    await this.transaction.run(() => this.measureRepository.save(measure));
  }
}
