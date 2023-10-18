"use client"

import Link from 'next/link'
import React, { useState } from 'react'

import UserButton from "../userButton"
import Searchbar from './Searchbar'
import { useSession } from 'next-auth/react'

const Drawer = ({children}: {children: React.ReactNode}) => {
  const {data:session} = useSession()
  const [isChechked,setIsChecked] = useState<boolean>(false)

  return (
    <div className="drawer drawer-end">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" checked={isChechked} onChange={e=>{}}/> 
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    
    <div className="flex justify-between w-full navbar gap-2 bg-base-300 fixed z-20">
      <div className="md:px-2 md:mx-2">
        <Link href='/' className='font-semibold text-md md:text-xl text-base-content'>
            ImageDash
        </Link>
      </div>
      <Searchbar/>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal items-center gap-4 p-0">
          <li>
            <Link href='/explore' className='btn btn-sm rounded-lg btn-ghost text-base-content'>
                Explore
            </Link>
          </li>
          <li>
            <Link href='/upload' className='btn btn-sm rounded-lg btn-ghost text-base-content'>
                Upload
            </Link>
          </li>
            <li>
              <UserButton session={session} setIsChecked={setIsChecked}/>
            </li>
        
        </ul>
      </div>
      <div className="flex-none lg:hidden" onClick={()=>setIsChecked(true)}>
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn bg-transparent outline-none border-none p-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
    </div>
    {/* Page content here */}
    <main className='mt-16 z-10 bg-base-100 text-base-content'>
        {children}
    </main>
  </div> 
  <div className="drawer-side z-20">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay" onClick={()=>setIsChecked(false)}></label> 
    <ul className="menu p-4 w-44 min-h-full bg-base-200 pt-16 flex flex-col gap-4 ">
      {/* Sidebar content here */}
      <Link href='/explore' className='btn justify-start' onClick={()=>setIsChecked(false)}>
        Explore
      </Link>
      <Link href={`${session? '/upload':'/sign-in'}`} className='btn justify-start' onClick={()=>setIsChecked(false)}>
        Upload
      </Link>
      <div className='pl-4' onClick={()=>setIsChecked(false)}>
      <UserButton session={session} setIsChecked={setIsChecked}/>
      </div>
    </ul>
  </div>
</div>
  )
}

export default Drawer