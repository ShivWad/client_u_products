'use client'
import { TProduct, TResponseObject } from '@/types'
import { MarkAsSold } from '@/utils'
import { faCheck, faCross, faEdit, faEye, faL, faStop } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

const MiniProduct = ({ product, owner }: { product: TProduct, owner: boolean }) => {
    const [index, setIndex] = useState(0);
    const [sold, setSold] = useState(product.isAvailable);
    // Parse the input string to create a Date object
    const inputDate = new Date(product.updatedAt);

    // Format the date in another format (e.g., "December 3, 2023")
    const formattedDate = inputDate.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
    });

    const handleMarkAsSold = async (product_id: string) => {
        setSold(true);
        MarkAsSold(product_id).then((res) => {
            if (res.status === "SUCCESS") {
                let updatedProduct: TProduct = res.res;
                console.log(updatedProduct);
                if (updatedProduct.isAvailable) {
                    setSold(true);
                }
            }
            else {
                console.log(res)
                setSold(false);
            }
        }).catch((reason: TResponseObject) => {
            console.log(reason);
            setSold(false);
        });
    }

    return (
        <div
            onClick={() => {
                if (!owner) window.open(`/product/${product._id}`, '_blank');
            }}
            className={`mini-product-main ${owner ? "active" : ""} ${product.isAvailable || sold ? "sold" : ""}`}>
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

            <div className={`admin-control ${owner ? "active" : ""}`}>
                <button className='view'>
                    <FontAwesomeIcon icon={faEye} onClick={() => window.open(`/product/${product._id}`, "_blank")} />
                </button>
                <button className='edit' onClick={() => window.open(`/account/product/edit/${product._id}`)}>
                    <FontAwesomeIcon icon={faEdit} />
                </button>
                <button className='sold' onClick={() => handleMarkAsSold(product._id)}>
                    {sold ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faStop} />}
                </button>
            </div>
        </div >
    )
}
export default MiniProduct  