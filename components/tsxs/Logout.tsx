'use client'

import { logout } from '@/utils'
import React from 'react'

const Logout = () => {
    return (
        <button onClick={async () => await logout()}>LOGOUT</button>
    )
}

export default Logout