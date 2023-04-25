import amqp from "amqplib";

const url = "amqp://localhost";

const connection: amqp.Connection = async () => await amqp.connect(url);

function createQueue(channel, queue) {
  return new Promise((resolve, reject) => {
    try {
      channel.assertQueue(queue, { durable: true });
      resolve(channel);
    } catch (err) {
      reject(err);
    }
  });
}

export function sendToQueue(queue, message) {
  connection()
    .then((conn) => conn.createChannel())
    .then((channel) => createQueue(channel, queue))
    .then((channel) =>
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
    )
    .catch((err) => console.log(err));
}

export function consume(queue, callback) {
  connection()
    .then((conn) => conn.createChannel())
    .then((channel) => createQueue(channel, queue))
    .then((channel) => channel.consume(queue, callback, { noAck: true }))
    .catch((err) => console.log(err));
}
