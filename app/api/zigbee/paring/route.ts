import {NextRequest, NextResponse} from "next/server";
import mqttPublish from "@/mqtt/publish";

export const GET = (request: NextRequest) => {
    mqttPublish({topic: "zigbee2mqtt/bridge/request/permit_join",
        message: JSON.stringify({"value": true, "time": 600})})

    return new NextResponse()
}