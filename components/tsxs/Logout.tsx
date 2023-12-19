'use client'

import { logout } from '@/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logout = () => {

    const router = useRouter();

    return (
        <button onClick={async () => {
            let res = await logout();
            if (res) router.replace("/login");
        }}>LOGOUT</button>
    )
}

export default Logout