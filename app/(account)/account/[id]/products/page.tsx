import { MiniProduct } from '@/components';
import { TProduct } from '@/types';
import React from 'react'

const getUserProducts = async (id: string): Promise<TProduct[]> => {
    let res = await fetch(`${process.env.EX_APP_URL}/api/user/id/${id}/products`, { next: { revalidate: 60000 } });
    let products = await res.json();
    return products;
}

const page = async ({ params }: { params: any }) => {
    let { id } = params;

    let products = await getUserProducts(id);

    return (
        <div className='user-products'>{
            products.map((product) => {
                return (
                    <>
                        <MiniProduct product={product} />
                    </>)
            })
        }</div>
    )
}

export default page