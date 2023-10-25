import mqttSubscribe from "@/mqtt/subscribe";

const registerOnSocketConnection = (io, socket) => {
    mqttSubscribe(({topic, message}) => {
        socket.broadcast.emit("receiveDeviceData",{topic,message});
        // console.log({topic, message})
    });

    // socket.on("sendDeviceData", mqttPublish);

    socket.on("close", (reason) => {
        console.error("Socket Closed: ", reason);
    });

    socket.on("disconnect", (reason) => {
        console.log("<--------- socket disconnected --------->")
    });
};

export default registerOnSocketConnection;
