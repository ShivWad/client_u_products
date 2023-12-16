import React from 'react'
;
import { redirect } from 'next/navigation';
import { checkAuth } from '@/utils';
import { LoginComp } from '@/components';

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
        <LoginComp/>
    )
}

export default page