import React from 'react';
import { redirect } from 'next/navigation';
import { checkAuth } from '@/utils';
import { LoginComp } from '@/components';

const page = async ({ searchParams }: { searchParams: any }) => {
    console.log(searchParams);
    if (searchParams.isAuthenticated) {
        if (searchParams.isAuthenticated != 'false') {
            if (searchParams.prev)
                redirect(`${searchParams.prev}`);
            else
                redirect("/");
        }
    }
    else {
        let authObj = await checkAuth();
        if (authObj.user?.isAuthenticated) {
            if (searchParams.prev) {
                redirect(`${searchParams.prev}`);
            }
            else
                redirect("/");
        }
    }
    return (
        <LoginComp />
    )
}

export default page