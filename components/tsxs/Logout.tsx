'use client'

import { logout } from '@/utils'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React from 'react'

const Logout = () => {

    const router = useRouter();

    return (
        <FontAwesomeIcon icon={faRightFromBracket} className='acc-logout-button' onClick={async () => {
            let res = await logout();
            if (res) router.replace("/login");
        }} />
    )
}

export default Logout