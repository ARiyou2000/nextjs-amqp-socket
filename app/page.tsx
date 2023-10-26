/** Add your relevant code here for the issue to reproduce */

"use client";

import {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";
import io, {Socket} from "socket.io-client";
import initSocket from "@/utils/initSocket";
import connectionConfig from "@/connection.config";
// import api from './ws-client';


// let socket;

// api.connect();

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

export default function Home() {
    const [deviceTopic, setDeviceTopic] = useState("")
    const [deviceValue, setDeviceValue] = useState("");
    const socket: MutableRefObject<null | Socket<ServerToClientEvents, ClientToServerEvents>> = useRef(null)

    const socketInitializer = useCallback(async () => {
            // We call this just to make sure we turn on the websocket server
            await initSocket();

            socket.current = io(undefined, {
                path: connectionConfig.socket.key,
            });

            socket.current.on("connect", () => {
                console.log("Socket Connected", socket.current?.id);
            });

            socket.current.on("receiveDeviceData", ({topic, message}) => {
                console.log("New message in client", message);

                setDeviceTopic(topic)
                setDeviceValue(message);
            });

            socket.current?.on("disconnect", () => {
                console.log("! ! ! ! ! ! ! socket disconnected ! ! ! ! ! ! !")
            })
        }, []
    )

    useEffect(() => {
        if (!socket.current) {
            console.log("init socket")
            console.log(socket.current)
            socketInitializer();
        }

        return () => {
            console.log("Exit")
            socket.current?.disconnect()
            socket.current?.close()
        }
    }, []);

    const [deviceId, setDeviceId] = useState("0xa4c1381c25a1daf0");
    const [deviceRegister, setDeviceRegister] = useState("state_center")
    const [messageValue, setMessageValue] = useState("");

    const handleDeviceIdChange = (e) => {
        const value = e.target.value;
        setDeviceId(value)
    };
    const handleDeviceRegisterChange = (e) => {
        const value = e.target.value;
        setDeviceRegister(value)
    };
    const handleMessageChange = (e) => {
        const value = e.target.value;
        setMessageValue(value)
    };

    const sendMessageHandler = async () => {
        // if (!socket.current) return;
        // socket.current.emit("sendDeviceData", );
        fetch("/api/zigbee/device", {
            method: "POST", body: JSON.stringify(
                {deviceId: deviceId, message: JSON.stringify({[deviceRegister]: messageValue})}
            )
        })
    };

    return (
        <>
            <main className="flex min-h-screen flex-col gap-8 items-center justify-start p-24 bg-pink-50">

                <div
                    className={"w-full h-full flex flex-col items-start justify-start gap-4 [&>p]:break-all [&>p]:border-4 [&>p]:p-4 [&>p]:flex-1 [&>p]:w-full"}>
                    <p>received topic: {deviceTopic}</p>
                    <p>received message: {deviceValue}</p>
                </div>

                <div className={"mt-auto"}>
                    <input
                        value={deviceId}
                        onChange={handleDeviceIdChange}
                        className="w-full h-12 px-2 rounded"
                        placeholder="Device ID"
                    />
                    <input
                        value={deviceRegister}
                        onChange={handleDeviceRegisterChange}
                        className="w-full h-12 px-2 rounded"
                        placeholder="Register ID"
                    />
                    <input
                        value={messageValue}
                        onChange={handleMessageChange}
                        className="w-full h-12 px-2 rounded"
                        placeholder="Message"
                    />
                </div>

                <button onClick={sendMessageHandler} className={"bg-amber-500 px-10 py-4 rounded-2xl"}>Send</button>
            </main>
            <button onClick={() => {
                fetch("/api/zigbee/paring")
            }}>
                Join device
            </button>
        </>
    );
}
