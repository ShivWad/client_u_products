import React from 'react'
import LoginComp from '../../../components/tsxs/LoginComp';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/utils';
import { SignUp } from '@/components';

const page = async () => {
    let authObj = await checkAuth();
    // console.log("isAuthenticated>>", isAuthenticated);
    if (authObj.user?.isAuthenticated) {
        redirect("/");
    }

    return (
        <SignUp />
    )
}

export default page