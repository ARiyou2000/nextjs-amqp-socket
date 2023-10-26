import {NextRequest, NextResponse} from "next/server";
import mqttPublish from "@/mqtt/publish";
import connectionConfig from "@/connection.config";

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    const {deviceId, message} = body
    console.log("Publish to MQTT: ", body)

    if (deviceId && message) {
        mqttPublish({topic: `${connectionConfig.mqtt.mainTopic}/${deviceId}/set`, message})
    }
    // console.log(JSON.parse(body))
    // console.log(JSON.parse(body))

    return new NextResponse(JSON.stringify({goodbye: "earth"}));
}