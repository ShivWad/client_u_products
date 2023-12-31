
import { LoaderButton } from '@/components';
import Logout from '@/components/tsxs/Logout';
import { checkAuth, Sleep } from '@/utils'
import { redirect } from 'next/navigation';

import React from 'react'
const page = async () => {
    let authObj = await checkAuth();
    let user = authObj.user;


    if (!user?.isAuthenticated) redirect("/login?prev=account");

    const handleClick = async () => {
        "use server";
        await Sleep(1000)
    }

    return (
        <div className='account-info-parent'>
            <div className='account-info-header'>
                {user?.name}
                <Logout />
            </div>
            <div className='account-info-main'>
                <div className='account-info-input'>
                    <span>Change email</span>
                    <input autoComplete="off" className='global-text-input' type='text' placeholder={user?.email} />
                </div>
                <div className='account-info-input'>
                    <span>Change password</span>
                    <input autoComplete="new-password" aria-autocomplete="inline" className='global-text-input' type="password" />
                </div>
                <LoaderButton handleClick={handleClick} displayText='Update Info' classNames='action' />
            </div>
        </div>
    )
}

export default page