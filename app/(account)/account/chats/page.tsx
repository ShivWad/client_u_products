import { Sleep } from '@/utils';
import React from 'react'

const page = async () => {
    let a = await Sleep(100000);
    return (
        <div>Chats</div>
    )
}

export default page