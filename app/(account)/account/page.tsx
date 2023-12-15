
import Logout from '@/components/Logout';
import { checkAuth, logout } from '@/utils'
import React from 'react'
const page = async () => {

    let isAuthenticated = await checkAuth();

    return (
        <>
            {isAuthenticated ? "logged in " : "logged out"}
            <Logout />
        </>
    )
}

export default page