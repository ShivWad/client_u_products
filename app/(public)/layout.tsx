import type { Metadata } from 'next'
import '../globals.css'
import { PublicNavBar } from '@/components'
import { TCategories, TLocations } from '@/types'


import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { checkAuth } from '@/utils';

config.autoAddCss = false; /* eslint-disable import/first */

export const metadata: Metadata = {
  title: 'PreOwnedPalace',
  description: 'Buy used goods!',
}

const getCities = async (): Promise<TLocations> => {
  let res = await fetch(`${process.env.EX_APP_URL}/api/cities`, { next: { revalidate: 60000 } });
  let locations = await res.json();
  return locations;
}

const getCategories = async (): Promise<TCategories> => {
  let res = await fetch(`${process.env.EX_APP_URL}/api/categories`, { next: { revalidate: 60000 } });
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
      <body >
        {/* <Provider store={store}> */}
        <PublicNavBar categoryJson={categoryJson} locationsJson={locationsJson} />
        {children}
        {/* </Provider> */}
      </body>
    </html>
  )
}
