import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedPublisher } from './events/ticket-created-publisher';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', async () => {
    console.log('publisher connected to NATS');

    const publisher = new TicketCreatedPublisher(stan);
    try{
        await publisher.publish({
            id: randomBytes(4).toString('hex'),
            title: 'concert-' + randomBytes(4).toString('hex'),
            price: 22
        })
    } catch(err) {
        console.error(err)
    }



    // const data = JSON.stringify({
    //     id: randomBytes(4).toString('hex'),
    //     title: 'concert-' + randomBytes(4).toString('hex'),
    //     price: 22
    // });
    // stan.publish('ticket:created', data, () => {
    //     console.log('Event Published', data);
    // });
});
