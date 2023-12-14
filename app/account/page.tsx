
import Logout from '@/components/Logout';
import { checkAuth, logout } from '@/utils'
import React from 'react'

const page = async () => {

    let isAuthenticated = await checkAuth();

    return (
        <>
            <div>{isAuthenticated ? "Logged in" : "Logged out"}</div>
            <Logout />
        </>
    )
}

export default page