
import { NewProduct } from '@/components';
import { checkAuth } from '@/utils'
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  let authObj = await checkAuth();
  if (!authObj.user?.isAuthenticated) redirect("/login?prev=/account/product/new");
  return (
    <>
      <NewProduct authObj={authObj} />
    </>
  )
}

export default page