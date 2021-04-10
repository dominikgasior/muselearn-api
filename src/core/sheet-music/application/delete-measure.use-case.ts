import { CommandHandler } from '@nestjs/cqrs';
import { DeleteMeasureCommand } from './command/delete-measure.command';
import { MeasureRepository } from './gateway/measure.repository';
import { Transaction } from '../../shared/application/gateway/transaction';
import { DateFactory } from '../../shared/domain/date.factory';

@CommandHandler(DeleteMeasureCommand)
export class DeleteMeasureUseCase {
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly transaction: Transaction,
    private readonly dateFactory: DateFactory,
  ) {}

  async execute(command: DeleteMeasureCommand): Promise<void> {
    const measure = await this.measureRepository.get(command.id);

    measure.delete(this.dateFactory.now());

    await this.transaction.run(() => this.measureRepository.save(measure));
  }
}
