import { Server } from 'socket.io'
import amqp from "amqplib";
// import {createServer} from "http";

// const server = createServer(app);

const SocketHandler = async (req, res) => {
    if (res.socket.server.io) {
        console.log('Socket is already running')
    } else {
        console.log('Socket is initializing')
        const io = new Server(res.socket.server)
        res.socket.server.io = io
    }
    res.end()
}

export default SocketHandler

