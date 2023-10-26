"use client";

import {
    MutableRefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import io, {Socket} from "socket.io-client";
import initSocket from "@/utils/initSocket";
import connectionConfig from "@/connection.config";
import {messageType, mqttPacketType, topicType} from "@/mqtt";

interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
    hello: () => void;
}

interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}

const useSocket = () => {
    const [mqttTopic, setMqttTopic] = useState<topicType>("");
    const [mqttMessage, setMqttMessage] = useState<messageType>("");
    const socket: MutableRefObject<null | Socket<
        ServerToClientEvents,
        ClientToServerEvents
    >> = useRef(null);

    const socketInitializer = useCallback(async () => {
        // We call this just to make sure we turn on the websocket server
        await initSocket();

        socket.current = io(undefined, {
            path: connectionConfig.socket.key,
        });

        socket.current.on("connect", () => {
            console.log("Socket Connected", socket.current?.id);
        });

        socket.current.on(
            "receiveDeviceData",
            ({topic, message}: mqttPacketType) => {
                console.log("New message in client", message);

                setMqttTopic(topic);
                setMqttMessage(message);
            },
        );

        socket.current?.on("disconnect", () => {
            console.log("! ! ! ! ! ! ! socket disconnected ! ! ! ! ! ! !");
        });
    }, []);

    useEffect(() => {
        if (!socket.current) {
            console.log("init socket");
            console.log("Socket current value: ", socket.current);
            socketInitializer();
        }

        return () => {
            console.log("Exit");
            socket.current?.disconnect();
            socket.current?.close();
        };
    }, []);

    return [mqttTopic, mqttMessage];
};

export default useSocket;
