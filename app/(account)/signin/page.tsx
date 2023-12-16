import React from 'react'
import LoginComp from '../../../components/tsxs/LoginComp';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/utils';
import { SignUp } from '@/components';

const page = async () => {
    let isAuthenticated = await checkAuth();
    console.log("isAuthenticated>>", isAuthenticated);
    if (isAuthenticated) {
        redirect("/");
    }

    const handleLogin = () => {
        console.log(":adsd");
    }

    return (
        <SignUp />
    )
}

export default page