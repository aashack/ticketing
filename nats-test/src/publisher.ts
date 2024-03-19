import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('publisher connected to NATS');

    const data = JSON.stringify({
        id: randomBytes(4).toString('hex'),
        title: 'concert-' + randomBytes(4).toString('hex'),
        price: 20
    });
    stan.publish('ticket:created', data, () => {
        console.log('Event Published', data);
    });




    // stan.publish('ticket:created', data, () => {
    //     console.log('Event Published', data);
    // });
});


