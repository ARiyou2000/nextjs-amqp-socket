import mqttSubscribe from "@/mqtt/subscribe";

const registerOnSocketConnection = (io, socket) => {
    mqtt.subscribe(({topic, message}) => {
        // socket.broadcast.emit("receiveDeviceData",{topic,message});
        console.log({topic, message})
    });

    // mqttSubscribe(({topic, message}) => {
    //     socket.broadcast.emit("receiveDeviceData", {topic, message});
    //     // console.log({topic, message})
    // });

    // socket.on("sendDeviceData", mqtt.publish);

    socket.on("close", (reason) => {
        console.error("Socket Closed: ", reason);
    });

    socket.on("disconnect", (reason) => {
        console.log("<--------- socket disconnected --------->")
    });
};

export default registerOnSocketConnection;
