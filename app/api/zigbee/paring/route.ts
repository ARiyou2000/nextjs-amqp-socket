import {NextRequest, NextResponse} from "next/server";
import {mqttPublish} from "@/helpers/onSocketConnection";

export const GET = (request: NextRequest) => {
    mqttPublish({topic: "zigbee2mqtt/bridge/request/permit_join",
        message: JSON.stringify({"value": true, "time": 120})})

    return new NextResponse()
}