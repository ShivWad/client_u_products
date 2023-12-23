import { Sleep, checkAuth } from '@/utils'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    let authObj = await checkAuth();
    if (!authObj.user?.isAuthenticated) redirect("/login?prev=account/chats");

    let sleep = await Sleep(100000);


    return (
        <div></div>
    )
}

export default page