import { DomainEventPublisher } from '../../application/gateway/domain-event.publisher';
import { Injectable } from '@nestjs/common';
import { DomainEventStream } from '../../../shared/domain/domain-event-stream';

@Injectable()
export class MockedDomainEventPublisher implements DomainEventPublisher {
  publish(domainEventStream: DomainEventStream): void {}
}
