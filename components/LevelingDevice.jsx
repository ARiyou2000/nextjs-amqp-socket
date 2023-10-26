"use client"

import {useEffect} from "react";

const L1 = ({deviceRef}) => {
    console.log(deviceRef)

    useEffect(() => {
        console.log("changed: ", deviceRef, deviceRef.publicId)
    }, [deviceRef]);
    return <p>
        {JSON.stringify(deviceRef)}
        <h1>{deviceRef.publicId}</h1>
    </p>
}

const L2 = ({deviceRef}) => {
    return <L1 deviceRef={deviceRef}/>
}

const L3 = ({deviceRef}) => {
    return <L2 deviceRef={deviceRef}/>
}

const L4 = ({deviceRef}) => {
    return <L3 deviceRef={deviceRef}/>
}

const L5 = ({deviceRef}) => {
    return <L4 deviceRef={deviceRef}/>
}

export default L5