const mqtt = require("mqtt");
import connectionConfig from "@/connection.config";
import {messageType, mqttPacketType, topicType} from "@/mqtt/index";

const protocol = connectionConfig.mqtt.protocol
const host = connectionConfig.mqtt.host
const port = connectionConfig.mqtt.port

const connectUrl = `${protocol}://${host}:${port}`
// const connectUrl = `${connectionConfig.mqtt.protocol}://${connectionConfig.mqtt.host}:${connectionConfig.mqtt.port}`

const mainTopic = `${connectionConfig.mqtt.mainTopic}/#`

const mqttSubscribe = async (onMessage: (prop: mqttPacketType) => null) => {
    try {
        const client = mqtt.connect(connectUrl, connectionConfig.mqtt.options)

        client.on('connect', () => {
            // console.log('! ! ! ! ! ! ! ! ! ! ! Connected ! ! ! ! ! ! ! ! ! ! !')
            client.subscribe(mainTopic, (err) => {
                if (!err) {
                    console.log('! ! ! ! ! ! ! ! ! ! ! Connected ! ! ! ! ! ! ! ! ! ! !')
                }
                // client.publish(`${mainTopic}/set`, JSON.stringify({state_right: "ON"}));
            });
        })

        client.on("message", (topic: topicType, message: messageType) => {
            // console.log(`topic: ${topic}, message: ${message.toString()}`)
            // message is Buffer
            onMessage({topic: topic.replace(`${connectionConfig.mqtt.mainTopic}/`, ""), message: message.toString()})
        });
    } catch (ex) {
        console.error(ex);
    }
};

export default mqttSubscribe