import { Publisher, Subjects, TicketCreateEvent } from '@ajhstickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreateEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}