import React from 'react'
import LoginComp from './LoginComp';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/utils';

const page = async () => {
    let isAuthenticated = await checkAuth();
    console.log("isAuthenticated>>", isAuthenticated);
    if (isAuthenticated) {
        redirect("http://localhost:3000/");
    }
    return (
        <div>
            <LoginComp />
        </div>
    )
}

export default page