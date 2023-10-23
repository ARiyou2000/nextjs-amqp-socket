const mqtt = require("mqtt");
const client = mqtt.connect("tcp://127.0.0.1:1883");

client.on("connect", () => {
    client.subscribe("zigbee2mqtt/0xa4c1381c25a1daf0", (err) => {
        if (!err) {
            console.log('! ! ! ! ! ! ! ! ! ! ! Connected ! ! ! ! ! ! ! ! ! ! !')
            // client.publish("presence", "Hello mqtt");
            // client.publish("0xa4c1381c25a1daf0/set", '{"state_center":"ON","state_left":"ON","state_right":"ON"}');
            client.publish("zigbee2mqtt/0xa4c1381c25a1daf0/set", JSON.stringify({state_right: "ON"}));
            // client.publish("0xa4c1381c25a1daf0/set", "{\"state_center\":\"ON\",\"state_left\":\"ON\",\"state_right\":\"ON\"}");

        }
    });
});

client.on("message", (topic, message) => {
    console.log(`topic: ${topic}, message: ${message.toString()}`)
    // message is Buffer
    // console.log(message.toString());
    client.end();
});