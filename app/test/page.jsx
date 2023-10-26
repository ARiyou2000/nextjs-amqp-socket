"use client"

import LevelingDevice from "../../components/LevelingDevice";
import {useEffect, useState} from "react";

class DeviceClass {
    publicId = "kjsfgdh-alksdg-aslfdj-alskdfj"

    constructor(publicId) {
        this._publicId = publicId;
    }


    get publicId() {
        // console.log("getter called")
        return this._publicId;
    }

    set publicId(value) {
        console.log("set value called")
        this._publicId = value;
    }
}

const TestPage = () => {
    const [device, setDevice] = useState(new DeviceClass("qweqwer-poiu-ertyiey"))
    // setInterval(() => {
    //     device.publicId = Math.random().toString().slice(3)
    // }, 1000)

    useEffect(() => {

        const interval = setInterval(() => {
            const d = new DeviceClass("kkkkkkkkkkk")
            d.publicId = Math.random().toString().slice(3)
            setDevice(d)
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <>
            <LevelingDevice deviceRef={device}/>
        </>
    )
}

export default TestPage