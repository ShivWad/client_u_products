import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NavBar } from '@/components'
import { TCategories, TLocations } from '@/types'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const getCities = async (): Promise<TLocations> => {
  let res = await fetch(`${process.env.EX_APP_URL}/api/cities`, { next: { revalidate: 10800 } });
  let locations = await res.json();
  return locations;
}

const getCategories = async (): Promise<TCategories> => {
  let res = await fetch(`${process.env.EX_APP_URL}/api/categories`, { next: { revalidate: 10800 } });
  let categoryJson = await res.json();
  return categoryJson;
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  let categoryJson = await getCategories();
  let locationsJson = await getCities();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar categoryJson={categoryJson} locationsJson={locationsJson} />
        {children}
      </body>
    </html>
  )
}
