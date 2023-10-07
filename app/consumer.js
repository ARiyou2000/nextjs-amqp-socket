const amqp = require("amqplib");

export default async function connect() {
    try {
        // const amqpServer = "amqp://localhost:15672"
        const amqpServer = "amqps://dpsiqljr:O-y2ULFY3ZQaCxIPqKSo0zfkkrITjT9J@hawk.rmq.cloudamqp.com/dpsiqljr"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Recieved job with input ${input.number}`)
            //"7" == 7 true
            //"7" === 7 false

            if (input.number == 7)
                channel.ack(message);
        })

        console.log("Waiting for messages...")

    } catch (ex) {
        console.error(ex)
    }

}