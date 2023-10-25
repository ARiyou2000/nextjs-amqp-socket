import {Server} from "socket.io";
import onSocketConnection from "@/helpers/onSocketConnection";
import connectionConfig from "@/connection.config";

export default function handler(req, res) {
    // console.log("res.socket", res.socket.server.io)
    if (res.socket.server.io) {
        console.log("Server already started!");

        res.end();
        return;
    }

    const io = new Server(res.socket.server, {
        path: connectionConfig.socket.key,
    });
    res.socket.server.io = io;

    io.on("connection", (socket) => {
        onSocketConnection(io, socket)
    });

    console.log("Socket server started successfully!");
    res.end();
}
