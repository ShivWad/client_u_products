import React, { ReactNode } from 'react'
import '../globals.css'
import { AccountLayout } from '@/components'
import { checkAuth, logout } from '@/utils'
import { redirect } from 'next/navigation'


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    let authObj = await checkAuth();
    if (!authObj.user?.isAuthenticated) redirect(`/login?prev=account&isAuthenticated=false`);

    return (
        <html lang="en">
            <body style={{ background: "#1e1f20", position: "absolute" }} >
                <AccountLayout user={authObj.user}>
                    {children}
                </AccountLayout>
            </body>
        </html>
    )
}
