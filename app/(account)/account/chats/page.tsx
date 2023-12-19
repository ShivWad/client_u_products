import React from 'react'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const page = async () => {
    let a = await sleep(1000);
    return (
        <div>Chats</div>
    )
}

export default page