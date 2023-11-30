import { Product } from '@/components';
import { TProduct } from '@/types';
import Image from 'next/image';
import React from 'react'

const getProduct = async (id: string): Promise<TProduct> => {
    let res = await fetch(`${process.env.EX_APP_URL}/api/product/id/${id}`);
    let responseJson = await res.json();
    return responseJson;
}
const page = async ({ params }: { params: { id: string } }) => {
    let product = await getProduct(params.id);
    return (
        <Product product={product} />
    )
}

export default page