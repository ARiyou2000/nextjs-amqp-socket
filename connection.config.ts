// /** @type {import('mqtt/src/lib/client').IConnackPacket} */
import {IClientOptions} from "mqtt/src/lib/client";

const connectionConfig = {
    socket: {
        key: "/my_socket_key"
    },
    mqtt: {
        mainTopic: "zigbee2mqtt",
        protocol: 'tcp',
        host: '127.0.0.1',
        port: '1883',
        options: {
            // clientId: `clientId`,
            // clientId: `mqtt_${Math.random().toString(16).slice(3)}`
            // clean: true,
            // wsOptions: {},
            // keepalive: 60,
            // connectTimeout: 4000,
            // username: 'emqx',
            // password: 'public',
            // reconnectPeriod: 1000,
        } as IClientOptions
    }
}

module.exports = connectionConfig
export default connectionConfig;