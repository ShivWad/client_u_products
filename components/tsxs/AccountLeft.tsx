'use client'
import React from 'react'
import { useParams, usePathname } from 'next/navigation'
import { TUser } from '@/types';
const AccountLeft = () => {
    const pathname = usePathname();
    const { id } = useParams();


    const linksArray = [
        {
            href: `/account/${id}`,
            label: "Account"
        },
        {
            href: `/account/${id}/chats`,
            label: "My Chats"
        },
        {
            href: `/account/${id}/products`,
            label: "My Products"
        }
    ];

    return (
        <>
            {linksArray.map((anchor, index) => {
                return (
                    <a key={anchor.href + index} className={`acc-nav-button ${pathname === anchor.href ? 'selected' : ""}`} href={anchor.href}>{anchor.label}</a>
                )
            })}
        </>
    )
}

export default AccountLeft