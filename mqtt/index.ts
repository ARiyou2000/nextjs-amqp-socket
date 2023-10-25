import subscribe from "@/mqtt/subscribe";
import publish from "@/mqtt/publish";

export type topicType = string
export type messageType = string | Buffer
export type mqttPacketType = { topic: topicType, message: messageType }

const mqtt = {
    subscribe: subscribe,
    publish: publish
}

export default mqtt