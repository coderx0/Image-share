import React from 'react'
import SignInPage from './signinPage'
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Page = async() => {
  const session  = await getAuthSession()
  if(session){
    redirect('/');
  }
  return (
    <SignInPage/>
  )
}

export default Page