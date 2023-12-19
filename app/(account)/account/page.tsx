
import Logout from '@/components/tsxs/Logout';
import { checkAuth, logout } from '@/utils'

import React from 'react'
const page = async () => {
    let authObj = await checkAuth();

    return (
        <>
            {authObj.user?.isAuthenticated ? "logged in " : "logged out"}
            <Logout />
        </>
    )
}

export default page