import { MiniProduct } from '@/components';
import { TProduct } from '@/types';
import React from 'react'


const handleGetAllProducts = async (): Promise<[TProduct]> => {
    let res = await fetch(`${process.env.EX_APP_URL}/api/product/all`);
    let responseJson = await res.json();
    return responseJson;
}

const page = async () => {
    let products = await handleGetAllProducts();
    return (
        <div className='product-page'>
            {products.map((product) => {
                return (
                    <MiniProduct admin={false} product={product} key={`${product._id}`} />
                )
            })}
        </div>
    )
}

export default page