const mqtt = require("mqtt");

const protocol = 'tcp'
const host = '192.168.1.137'
const port = '1883'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `${protocol}://${host}:${port}`

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
        const client = mqtt.connect(connectUrl, mqttConnectionOptions);
        client.publish(topic, message);
    } catch (ex) {
        console.error(ex);
    }
};

const mqttToSocket = async (socketInstance) => {
    try {
        const client = mqtt.connect(connectUrl, mqttConnectionOptions)

        client.on('connect', () => {
            console.log('! ! ! ! ! ! ! ! ! ! ! Connected ! ! ! ! ! ! ! ! ! ! !')
        })

        client.on("message", (topic, message) => {
            // message is Buffer
            socketInstance.broadcast.emit("receiveDeviceData", {topci, message});
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
