/** Add your relevant code here for the issue to reproduce */

"use client";

import {useCallback, useEffect, useState} from "react";
import io from "socket.io-client";
// import api from './ws-client';


let socket;

// api.connect();

export default function Home() {
    const [value, setValue] = useState("");

    const socketInitializer = useCallback(async () => {
            // We call this just to make sure we turn on the websocket server
            await fetch("/api/socket");

            socket = io(undefined, {
                path: "/api/my_awesome_socket",
            });

            socket.on("connect", () => {
                console.log("Connected", socket.id);
            });

            socket.on("receiveDeviceData", (msg) => {
                console.log("New message in client", msg);
                setValue(msg);
            });
        }, []
    )

    useEffect(() => {
        !socket && socketInitializer();

        return () => {
            socket?.close()
        }
    }, []);

    const [topicValue, setTopicValue] = useState("");
    const [messageValue, setMessageValue] = useState("");

    const handleTopicChange = (e) => {
        const value = e.target.value;
        setTopicValue(value)
    };
    const handleMessageChange = (e) => {
        const value = e.target.value;
        setMessageValue(value)
    };

    const sendMessageHandler = async () => {
        if (!socket) return;
        socket.emit("sendDeviceData", {topic: topicValue, message: messageValue});
    };

    return (
        <main className="flex min-h-screen flex-col gap-8 items-center justify-start p-24 bg-pink-50">


            <div
                className={"w-full h-full flex flex-col items-start justify-start gap-4 [&>p]:border-4 [&>p]:p-4 [&>p]:flex-1 [&>p]:w-full"}>
                <p>received message: {value}</p>
            </div>

            <div className={"mt-auto"}>
                <input
                    value={topicValue}
                    onChange={handleTopicChange}
                    className="w-full h-12 px-2 rounded"
                    placeholder="Topic"
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
    );
}
