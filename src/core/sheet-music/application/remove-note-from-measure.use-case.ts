import { CommandHandler } from '@nestjs/cqrs';
import { RemoveNoteFromMeasureCommand } from './command/remove-note-from-measure.command';
import { MeasureRepository } from './gateway/measure.repository';
import { Transaction } from '../../shared/application/gateway/transaction';
import { DateFactory } from '../../shared/domain/date.factory';

@CommandHandler(RemoveNoteFromMeasureCommand)
export class RemoveNoteFromMeasureUseCase {
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly transaction: Transaction,
    private readonly dateFactory: DateFactory,
  ) {}

  async execute(command: RemoveNoteFromMeasureCommand): Promise<void> {
    const measure = await this.measureRepository.get(command.measureId);

    measure.removeNote(command.noteId, this.dateFactory.now());

    await this.transaction.run(() => this.measureRepository.save(measure));
  }
}
