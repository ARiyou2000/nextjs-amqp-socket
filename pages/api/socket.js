import {Server} from "socket.io";
import onSocketConnection from "@/helpers/onSocketConnection";

export default function handler(req, res) {
    // console.log("res.socket", res.socket.server.io)
    if (res.socket.server.io) {
        console.log("Server already started!");

        res.end();
        return;
    }

    const io = new Server(res.socket.server, {
        path: "/my_socket_key",
    });
    res.socket.server.io = io;

    const onConnection = (socket) => {
        console.log("New connection", socket.id);
        socket.on("disconnect", (reason) => {
            // ...
            console.log("<--------- socket disconnected --------->")
        });
        onSocketConnection(io, socket);
    };

    io.on("connection", onConnection);

    // io.on("disconnect",)

    console.log("Socket server started successfully!");
    res.end();
}
