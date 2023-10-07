// import ClientComponent from "@/components/ClientComponent";
// import {revalidatePath} from "next/cache";
// // import connect from "@/app/consumer";
// const amqp = require("amqplib".);
// const fs = require('fs');
import {publish} from "@/actions/publish";
import ClientComponent from "@/components/ClientComponent";


// export async function c() {
//     'use server'
//     await connect()
// }

export default async function Home() {


    // async function connect() {
    //     console.log("connecting...")
    //     try {
    //         // const amqpServer = "amqp://localhost:15672"
    //         const amqpServer = "amqps://dpsiqljr:O-y2ULFY3ZQaCxIPqKSo0zfkkrITjT9J@hawk.rmq.cloudamqp.com/dpsiqljr"
    //         const connection = await amqp.connect(amqpServer)
    //         const channel = await connection.createChannel();
    //         await channel.assertQueue("jobs");
    //
    //         const x = channel.consume("jobs", message => {
    //             const input = JSON.parse(message.content.toString());
    //             console.log(`Recieved job with input ${input}`)
    //             //"7" == 7 true
    //             //"7" === 7 false
    //
    //             fs.appendFile('mynewfile1.txt', ` ${input}`, function (err) {
    //                 if (err) throw err;
    //                 console.log('Updated!');
    //             });
    //
    //             console.log("reading file data")
    //             fs.readFile('mynewfile1.txt', 'utf8', function (err, data) {
    //                 console.log("data 1 : ", data)
    //                 return data
    //             });
    //
    //             if (input == "7") {
    //                 channel.ack(message);
    //             }
    //
    //             return "hello world"
    //         })
    //
    //         console.log("Waiting for messages...")
    //
    //         revalidatePath("/")
    //
    //     } catch (ex) {
    //         console.error(ex)
    //     }
    //     console.log("end of connection!")
    // }
    //
    // await connect();
    //
    // fs.readFile('mynewfile1.txt', 'utf8', function (err, data) {
    //     console.log("data 2 : ", data)
    //     return data
    // });

    // const data = await fetch("http://localhost:3000/api")
    // console.log(data)

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <form action={publish}>
                    <input type="text" name={"pincode"}/>
                    <button type={"submit"}>Send to server</button>
                </form>
                {/*<p>Array:{JSON.stringify(arr)}</p>*/}
                {/*<p>Array:{JSON.stringify(data)}</p>*/}
                {/*<p>Array form component:<ClientComponent data={arr}/></p>*/}
                <p>Array form component:<ClientComponent /></p>
            </div>
        </main>
    )
}
