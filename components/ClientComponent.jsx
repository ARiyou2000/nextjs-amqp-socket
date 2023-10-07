"use client"

import {useEffect, useState} from "react";

const ClientComponent = ({data}) => {
    // const [state, dispatcher] = useReducer({})
    const [val, setVal] = useState({})

    const [response, setResponse] = useState('')
    const [generating, setGenerating] = useState(false)

    useEffect(() => {
            const myInterval = setInterval(() => {
                setVal({})
            }, 500)
            return () => {
                clearInterval(myInterval)
            }
        }, []
    )

    useEffect(() => {
        const getData = async () => {
            try {

                setGenerating(true)
                setResponse('')

                // make a POST call to our api route
                let res = await fetch('/api', {
                    headers: {
                        'Content-type': 'application/json',
                    },
                })

                if (res.ok) {
                    // https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream/getReader
                    const reader = res.body.getReader();

                    const processStream = async () => {
                        while (true) {
                            // .read() returns 2 properties
                            const {done, value} = await reader.read()

                            // if done is true
                            if (done) {
                                console.log('stream completed')
                                setGenerating(false)
                                break;
                            }
                            // value is a binary data in Uint8Array format, as Uint8Array is suitable data structure for binary data
                            // we decode Uint8Array using TextDecoder
                            let chunk = new TextDecoder('utf-8').decode(value)

                            // chunk like this -> data: {"response":" sweet"}
                            // we remove the 'data: ' from the chunk
                            chunk = chunk.replace(/^data: /, '');

                            // parse the chunk
                            const parsed = JSON.parse(chunk)

                            // append to the response
                            setResponse((prev) => prev + parsed.response);

                            // Easy Peasy!! :)
                        }
                    }

                    processStream().catch(err => console.log('--stream error--', err))

                } else {
                    alert(`error getting response`)
                }
            } catch (error) {
                alert(`error: ${error.message}`)
            }
        }

        getData()
    }, []);

    useEffect(() => {
        console.log(response), [response]
    })
    return (
        <>
            {response}

            {/*<div>{JSON.stringify(data)}</div>*/}
        </>
    )
}


export default ClientComponent