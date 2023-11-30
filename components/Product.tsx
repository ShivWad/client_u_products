'use client'

import { TProduct } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './components.module.css'
const Product = ({ product }: { product: TProduct }) => {
    const [imageIndex, setImageIndex] = useState(0);
    return (
        <>
            <div className={styles['main-image-crou']}>
                <Image src={product.images[imageIndex]} width={600} height={600} alt='image' />
                <div className={styles['image-nav-dot']}>
                    {product.images.map((imgUrl, index) => {
                        return (
                            <div className={`${styles['img-dot']} ${index === imageIndex ? styles['active'] : ''}`} key={index} onClick={() => setImageIndex(index)}></div>
                        )
                    })}
                </div>
            </div >
            <div></div>
        </>
    )
}

export default Product