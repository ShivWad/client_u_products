import React, { ReactNode } from 'react'
import '../globals.css'
import { AccountNavbar } from '@/components'
import { Provider } from 'react-redux'
import { store } from '@/redux/store'
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body >
                {/* <Provider store={store}> */}
                    <AccountNavbar />
                    {children}
                {/* </Provider> */}
            </body>
        </html>
    )
}

export default RootLayout