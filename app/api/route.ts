const amqp = require("amqplib");

function iteratorToStream(iterator: any) {
    return new ReadableStream({
        async pull(controller) {
            const {value, done} = await iterator.next()

            if (done) {
                controller.close()
            } else {
                controller.enqueue(value)
            }
        },
    })
}

function sleep(time: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, time)
    })
}

const encoder = new TextEncoder()

async function* makeIterator() {
    yield encoder.encode('One')
    await sleep(5000)
    yield encoder.encode('Two')
    await sleep(5000)
    yield encoder.encode('Three')
}

import { PassThrough } from 'stream';

// export default async function handler(req, res) {
//     const myStream = new PassThrough();
//
//     // Write data to the stream
//     myStream.write('Hello, world!');
//
//     // Pipe the stream to the response
//     myStream.pipe(res);
// }

export async function GET() {
    const response = new Response()
    // const iterator = makeIterator()
    // const stream = iteratorToStream(iterator)

    // try {
    //     // const amqpServer = "amqp://localhost:15672"
    //     const amqpServer = "amqps://dpsiqljr:O-y2ULFY3ZQaCxIPqKSo0zfkkrITjT9J@hawk.rmq.cloudamqp.com/dpsiqljr"
    //     const connection = await amqp.connect(amqpServer)
    //     const channel = await connection.createChannel();
    //     await channel.assertQueue("jobs");
    //
    //     channel.consume("jobs", message => {
    //         const input = JSON.parse(message.content.toString());
    //         console.log(`Recieved job with input ${input.number}`)
    //         //"7" == 7 true
    //         //"7" === 7 false
    //
    //         if (input.number == 7)
    //             channel.ack(message);
    //     })
    //
    //     console.log("Waiting for messages...")
    //
    // } catch (ex) {
    //     console.error(ex)
    // }
    const myStream = new PassThrough();

    // Write data to the stream
    myStream.write('Hello, world!');

    // Pipe the stream to the response
    myStream.pipe(res);

    return response
}