/** Add your relevant code here for the issue to reproduce */

"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import io from "socket.io-client";
// import api from './ws-client';


// let socket;

// api.connect();

export default function Home() {
    const [value, setValue] = useState("");
    const [switchStatus, setSwitchStatus] = useState({
        linkquality: 0,
        state_center: "OFF",
        state_left: "OFF",
        state_right: "OFF"
    })
    const socket = useRef(null)

    const socketInitializer = useCallback(async () => {
            // We call this just to make sure we turn on the websocket server
            await fetch("/api/socket");

            socket.current = io(undefined, {
                path: "/api/my_awesome_socket",
            });

            socket.current.on("connect", () => {
                console.log("Connected", socket.current.id);
            });

            socket.current.on("receiveDeviceData", (msg) => {
                console.log("New message in client", JSON.parse(msg.message));
                setValue(JSON.stringify(msg));
                setSwitchStatus(JSON.parse(msg.message))
            });
        }, []
    )

    useEffect(() => {
        !socket.current && socketInitializer();

        return () => {
            socket.current?.close()
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
        if (!socket.current) return;
        socket.current.emit("sendDeviceData", {topic: topicValue, message: messageValue});
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
