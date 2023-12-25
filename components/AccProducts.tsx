"use client"

import { TProduct } from '@/types'
import { faCat, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'
import React from 'react'
import { MiniProduct } from '.'

const AccProducts = ({ products }: { products: TProduct[] }) => {
    const router = useRouter();
    return (
        <div className={`user-products-main ${products.length ? "" : "no-grid-row"}`}>
            {products.length > 1 ?

                <div className='user-product-header'>
                    <span><b>No of products: </b>{products.length}</span>
                    <FontAwesomeIcon icon={faPlus} onClick={() => router.push("/account/products/new")} style={{ display: "flex", alignItems: "center", gap: "20px", cursor: "pointer" }} />
                </div>
                : ""
            }
            <div className={`user-products ${products.length < 1 ? "no-products" : ""}`}>
                {products.length > 0 ?
                    products.map((product) => {
                        return (
                            <>
                                <MiniProduct admin={true} product={product} />
                            </>)
                    })
                    :
                    <>  <FontAwesomeIcon className='cat' icon={faCat} />
                        <button onClick={() => router.push("/account/products/new")} style={{ display: "flex", alignItems: "center", gap: "20px", cursor: "pointer" }} className='global-button'>Add your first product! <FontAwesomeIcon icon={faPlus} /></button></>
                }
            </div>
        </div >
    )
}

export default AccProducts