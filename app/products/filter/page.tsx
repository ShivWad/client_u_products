import { MiniProduct } from '@/components'
import { TProduct } from '@/types';
import { NextRequest } from 'next/server';
import React from 'react'


const handleGetAllProducts = async (filter: string): Promise<[TProduct]> => {
    let res = await fetch(`${process.env.EX_APP_URL}/api/product/filter${filter}`);
    let responseJson = await res.json();
    return responseJson;
}

const page = async ({ params }: { params: NextRequest }) => {

    const searchParams = params.nextUrl.searchParams
    const query = searchParams.values();
    let list = Array.from(query);
    return (
        <div className='product-page'>
            {list.map((s) => {
                return (<>
                    {s}
                </>)
            })}
        </div>
    )
}

export default page