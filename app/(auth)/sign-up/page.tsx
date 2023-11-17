import React from 'react'
import RegisterPage from './registerPage'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation';

const Page = async() => {
  const session = await getAuthSession();

  if(session){
    redirect('/')
  }

  return (
    <RegisterPage/>
  )
}

export default Page