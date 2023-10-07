"use server"

const amqp = require("amqplib");

export async function publish(formData) {
    try {
        // const amqpServer = "amqp://localhost:15672"
        const amqpServer = "amqps://dpsiqljr:O-y2ULFY3ZQaCxIPqKSo0zfkkrITjT9J@hawk.rmq.cloudamqp.com/dpsiqljr"
        const connection = await amqp.connect(amqpServer)
        const channel = await connection.createChannel();
        await channel.assertQueue("jobs");
        await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(formData.get("pincode"))))
        console.log(`Job sent successfully ${formData.get("pincode")}`);
        await channel.close();
        await connection.close();
    } catch (ex) {
        console.error(ex)
    }

}