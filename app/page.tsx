"use client";

import {useState} from "react";
import useSocket from "@/hooks/useSocket";


export default function Home() {

    const [deviceTopic, deviceValue] = useSocket()
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
