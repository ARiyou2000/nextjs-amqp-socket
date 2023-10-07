import amqp from "amqplib";


const amqpPublish = async (value) => {
    try {
        // const amqpServer = "amqp://localhost:15672"
        const amqpServer = "amqps://dpsiqljr:O-y2ULFY3ZQaCxIPqKSo0zfkkrITjT9J@hawk.rmq.cloudamqp.com/dpsiqljr"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(value)))
        console.log(`Job sent successfully ${value}`);
        await channel.close();
        await connection.close();
    } catch (ex) {
        console.error(ex)
    }
}

const amqpToSocket = async (socketInstance) => {
    try {
        // const amqpServer = "amqp://localhost:15672"
        const amqpServer = "amqps://dpsiqljr:O-y2ULFY3ZQaCxIPqKSo0zfkkrITjT9J@hawk.rmq.cloudamqp.com/dpsiqljr"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString());
            console.log(`Received job with input ${input}`)
            socketInstance.broadcast.emit("receiveDeviceData", input);
            //"7" == 7 true
            //"7" === 7 false

            // if (input.number == 7)
            //     channel.ack(message);
        })

        console.log("Waiting for messages...")

    } catch (ex) {
        console.error(ex)
    }
}

const registerOnConnection = (io, socket) => {

    amqpToSocket(socket)

    const sendDeviceData = (msg) => {
        console.log("New message", msg);
        socket.broadcast.emit("receiveDeviceData", msg)
        amqpPublish(msg)
    };

    socket.on("sendDeviceData", sendDeviceData);
    // socket.on("sendDeviceData", amqpPublish);
};

export default registerOnConnection