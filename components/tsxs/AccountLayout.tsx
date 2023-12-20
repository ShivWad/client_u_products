import { TUser } from '@/types';
// import { useRouter } from 'next/navigation';
import React, { Suspense } from 'react'
import AccountLeft from './AccountLeft';


const AccountLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {

    // const router = useRouter();

    // if (!user?.isAuthenticated) {
    //     router.push("/login?prev=account")
    // }
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