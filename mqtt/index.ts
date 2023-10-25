export type topicType = string
export type messageType = string | Buffer
export type mqttPacketType = { topic: topicType, message: messageType }
