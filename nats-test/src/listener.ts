import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS Connection Closed');
        process.exit();
    });

    const options = stan
        .subscriptionOptions()
        .setManualAckMode(true)// acknowledgement mode is true
        .setDeliverAllAvailable() // will redeliver every single event (not reccomended)
        .setDurableName('accounting-service');
    const subscription = stan.subscribe('ticket:created', 'queue-group-name', options);

    subscription.on('message', (msg: Message) => {
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`);
        }

        msg.ack();
    });
});

// These might not work on Windows
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());