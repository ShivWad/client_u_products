'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
const AccountLeft = () => {
    const pathname = usePathname();

    const linksArray = [
        {
            href: "/account",
            label: "Account"
        },
        {
            href: "/account/chats",
            label: "My Chats"
        },
        {
            href: "/account/products",
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