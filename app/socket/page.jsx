/** Add your relevant code here for the issue to reproduce */

"use client";

import {useEffect, useState} from "react";
import Link from 'next/link';
import io from "socket.io-client";

let socket;

export default function Home() {
    const [value, setValue] = useState("");

    const socketInitializer = async () => {
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
    };

    useEffect(() => {
        socketInitializer();
    }, []);

    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value)
    };

    const sendMessageHandler = async () => {
        if (!socket) return;
        socket.emit("sendDeviceData", inputValue);
    };

    return (
        <main className="flex min-h-screen flex-col gap-8 items-center justify-start p-24 bg-pink-50">


            <div className={"w-full h-full flex flex-col items-start justify-start gap-4 [&>p]:border-4 [&>p]:p-4 [&>p]:flex-1 [&>p]:w-full"}>
                <p>received message: {value}</p>
                <p>
                    sent message: {value}
                </p>
            </div>

            <input
                value={inputValue}
                onChange={handleInputChange}
                className="w-full h-12 px-2 mt-auto rounded"
                placeholder="Enter some text and see the syncing of text in another tab"
            />
            <button onClick={sendMessageHandler} className={"bg-amber-500 px-10 py-4 rounded-2xl"}>Send</button>
        </main>
    );
}
