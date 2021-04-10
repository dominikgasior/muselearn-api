import { AddMeasureCommand } from './command/add-measure.command';
import { CommandHandler } from '@nestjs/cqrs';
import { Measure } from '../domain/measure';
import { MeasureRepository } from './gateway/measure.repository';
import { Transaction } from '../../shared/application/gateway/transaction';
import { DateFactory } from '../../shared/domain/date.factory';

@CommandHandler(AddMeasureCommand)
export class AddMeasureUseCase {
  constructor(
    private readonly measureRepository: MeasureRepository,
    private readonly transaction: Transaction,
    private readonly dateFactory: DateFactory,
  ) {}

  async execute(command: AddMeasureCommand): Promise<void> {
    const measure = Measure.createEmpty(
      command.id,
      command.clefType,
      command.timeSignature,
      this.dateFactory.now(),
    );

    await this.transaction.run(() => this.measureRepository.save(measure));
  }
}
