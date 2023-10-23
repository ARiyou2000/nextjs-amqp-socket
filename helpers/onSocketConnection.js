const mqtt = require("mqtt");

const protocol = 'tcp'
const host = '127.0.0.1'
const port = '1883'
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`
const clientId = `clientId`

const connectUrl = `${protocol}://${host}:${port}`

const testTopic = "zigbee2mqtt/0xa4c1381c25a1daf0"
const mqttConnectionOptions = {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
}

const mqttPublish = async ({topic, message}) => {
    console.log("message to publish: ", {topic, message})
    try {
        const client = mqtt.connect(connectUrl);
        client.publish(topic, message);
    } catch (ex) {
        console.error(ex);
    }
};

const mqttToSocket = async (socketInstance) => {
    try {
        const client = mqtt.connect(connectUrl)

        client.on('connect', () => {
            // console.log('! ! ! ! ! ! ! ! ! ! ! Connected ! ! ! ! ! ! ! ! ! ! !')
            client.subscribe(testTopic, (err) => {
                if (!err) {
                    console.log('! ! ! ! ! ! ! ! ! ! ! Connected ! ! ! ! ! ! ! ! ! ! !')
                }
                // client.publish(`${testTopic}/set`, JSON.stringify({state_right: "ON"}));
            });
        })

        client.on("message", (topic, message) => {
            console.log(`topic: ${topic}, message: ${message.toString()}`)
            // message is Buffer
            socketInstance.broadcast.emit("receiveDeviceData", {topic, message: message.toString()});
            console.log(message.toString());
        });
    } catch (ex) {
        console.error(ex);
    }
};

const registerOnConnection = (io, socket) => {
    mqttToSocket(socket);

    socket.on("sendDeviceData", mqttPublish);
    socket.on("close", (reason) => {
        console.error("Socket Closed: ", reason);
    });
};

export default registerOnConnection;
