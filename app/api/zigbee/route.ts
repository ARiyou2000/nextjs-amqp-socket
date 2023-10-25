import {NextRequest, NextResponse} from "next/server";
import {mqttPublish} from "@/helpers/onSocketConnection";

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    console.log("Publish to MQTT: ", body)

    mqttPublish(body)
    // console.log(JSON.parse(body))
    // console.log(JSON.parse(body))

    return new NextResponse(JSON.stringify({goodbye: "earth"}));
}