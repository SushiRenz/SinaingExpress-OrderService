const amqp = require('amqplib');

let channel = null;
const QUEUE = 'order_placed';

async function connectRabbitMQ() {
  try {
    const conn = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    channel = await conn.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    console.log('✅ Connected to RabbitMQ and queue asserted:', QUEUE);
  } catch (err) {
    console.error('❌ Failed to connect to RabbitMQ:', err.message);
    throw err;
  }
}

async function publishOrderPlaced(order) {
  try {
    if (!channel) await connectRabbitMQ();
    console.log('Publishing to RabbitMQ:', order);
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(order)), { persistent: true });
    console.log('📤 Order published to queue:', QUEUE);
  } catch (err) {
    console.error('❌ Failed to publish order to RabbitMQ:', err.message);
  }
}

module.exports = { publishOrderPlaced };