'use client'
import { TProduct } from '@/types'
import Image from 'next/image'
import React from 'react'
import { useState } from 'react'
import styles from './components.module.css'
import { useRouter } from 'next/navigation'
const MiniProduct = ({ product }: { product: TProduct }) => {
    const [index, setIndex] = useState(0);
    // const router = useRouter();
    // const handleClick = () => {
    //     router.push(`/product/${product._id}`,);
    // }
    let date = new Date(product.updatedAt);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Month is zero-based, so add 1
    let day = date.getDate();
    let formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
    return (
        <div onClick={() => window.open(`/product/${product._id}`, '_blank')} className={styles['mini-product-main']}>
            <Image className={styles['mini-product-image']} width={200} height={200} src={product.images[index]} alt='err' />
            <div className={styles["mini-pro-info"]}>
                <p className={styles['name']}>{product.name}</p>
                <p className={styles['price']}>₹{product.price}</p>
                <p>{formattedDate}</p>
            </div>
        </div>
    )
}
export default MiniProduct  