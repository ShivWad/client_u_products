import AccProducts from '@/components/AccProducts';
import { TProduct } from '@/types';
import { checkAuth } from '@/utils';
import { redirect } from 'next/navigation';
import React from 'react'

const getUserProducts = async (id?: string): Promise<TProduct[]> => {
    let res = await fetch(`${process.env.EX_APP_URL}/api/user/id/${id}/products`);
    let products = await res.json();
    return products;
}

const page = async () => {
    let authObj = await checkAuth();
    if (!authObj.user?.isAuthenticated) redirect("/login?prev=/account/products");


    let products = await getUserProducts(authObj.user._id);

    return (
        <AccProducts products={products} />
    )
}

export default page
