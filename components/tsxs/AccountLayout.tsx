import { TUser } from '@/types';
// import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react'
import AccountLeft from './AccountLeft';
import { redirect } from 'next/navigation';

const AccountLayout = ({
    children,
    user
}: {
    children: React.ReactNode,
    user: TUser
}) => {

    if (!user?.isAuthenticated) {
        redirect("/login?prev=account");
    }
    return (
        <div className='account-container'>
            <div className='account-left'><AccountLeft /></div>
            <div className='account-right'>
                {children}
            </div>
        </div>
    )
}

export default AccountLayout