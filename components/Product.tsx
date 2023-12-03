'use client'

import { TProduct } from '@/types'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from './components.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faV } from '@fortawesome/free-solid-svg-icons'
import { checkAuth } from '@/utils'
import { useRouter } from 'next/navigation'

const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const Product = ({ product }: { product: TProduct }) => {
    const [imageIndex, setImageIndex] = useState(0);
    const router = useRouter();
    const handleContactSeller = async () => {
        let isUserAuthenticated = await checkAuth();

        console.log("isUserAuthenticated", isUserAuthenticated);

        if (!isUserAuthenticated) {
            router.push(`/login?prev=product/${product._id}`);
            return;
        }
        else {
            router.push('/chat');
        }
    }

    // Create our number formatter.
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    });
    const date = new Date(product.updatedAt);

    return (
        <div className={styles['main-product-page']}>
            <div className={styles['main-image-crou']}>
                <Image src={product.images[imageIndex]} fill={true} objectFit={"contain"} alt='image' />
                <div className={styles['image-nav-dot']}>
                    {product.images.map((imgUrl, index) => {
                        return (
                            <div className={`${styles['img-dot']} ${index === imageIndex ? styles['active'] : ''}`} key={index} onClick={() => setImageIndex(index)}></div>
                        )
                    })}
                </div>
                <FontAwesomeIcon className={`${styles['right-arr']} ${imageIndex === (product.images.length - 1) ? styles['edge-ind'] : ''}`} icon={faV} size='1x' onClick={() => setImageIndex(imageIndex + 1)} />
                <FontAwesomeIcon className={`${styles['left-arr']} ${imageIndex === 0 ? styles['edge-ind'] : ''}`} icon={faV} size='1x' onClick={() => setImageIndex(imageIndex - 1)} />

            </div >
            <div className={styles['product-info-right']}>
                <div className={styles['product-info-card']}>
                    <h1>{formatter.format(product.price)}</h1>
                    <p>{product.name}</p>
                    <p>Last updated : {`${date.getDate()}, ${date.toLocaleString('default', { month: 'long' })}`}</p>
                </div>
                <div className={styles['product-info-card']}>
                    <p>{product.description ?? loremIpsum}</p>
                </div>

                <div className={styles['product-info-card']}>
                    <h1>{product.ownerName}</h1>
                    <button onClick={() => handleContactSeller()}>Contact Seller</button>
                </div>

            </div>
        </div>
    )
}

export default Product