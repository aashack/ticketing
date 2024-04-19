import nats, { Message, Stan } from 'node-nats-streaming';
import { Listener } from './base-listener';
import { TicketCreateEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreateEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
    queueGroupName = 'payments-service';
  
    onMessage(data: TicketCreateEvent['data'], msg: Message) {
      console.log('Event data!', data);
      console.log(data.title);
      console.log(data.price)

      msg.ack();
    }
}