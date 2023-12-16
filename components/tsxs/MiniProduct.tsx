'use client'
import { TProduct } from '@/types'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

// Create our number formatter.
const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2

});

const MiniProduct = ({ product }: { product: TProduct }) => {
    const [index, setIndex] = useState(0);
    // Parse the input string to create a Date object
    const inputDate = new Date(product.updatedAt);

    // Format the date in another format (e.g., "December 3, 2023")
    const formattedDate = inputDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
    });

    return (
        <div onClick={() => window.open(`/product/${product._id}`, '_blank')} className={'mini-product-main'}>
            <Image className={'mini-product-image'} fill={true} src={product.images[index]} alt='err' />
            <div className={"mini-pro-info"}>
                <p className={'name'}>{product.name}</p>
                <span className={'description'}>{product?.description?.substring(0, 100) ?? loremIpsum.substring(0, 100)}...</span>
                <div className={'price-city-div'}>
                    <span>{product.city}</span>
                    <span className={'price'}>{formatter.format(product.price)}</span>
                    <span>{formattedDate}</span>
                </div>
            </div>
        </div>
    )
}
export default MiniProduct  