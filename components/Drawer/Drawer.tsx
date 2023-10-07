import Link from 'next/link'
import React from 'react'

import UserButton from "../userButton"
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const Drawer = async({children}: {children: React.ReactNode}) => {
  const session = await getServerSession(authOptions)

  return (
    <div className="drawer drawer-end">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" /> 
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    
    <div className="w-full navbar bg-base-300 fixed z-20">
      <div className="flex-1 px-2 mx-2">
        <Link href='/' className=' font-semibold text-xl'>
            ImageDash
        </Link>
      </div>
      <div className="flex-none hidden lg:block">
        <ul className="menu menu-horizontal items-center gap-4 p-0">
          <li>
            <Link href='/explore' className='btn btn-sm rounded-lg btn-ghost'>
                Explore
            </Link>
          </li>
          <li>
            <Link href='/upload' className='btn btn-sm rounded-lg btn-ghost'>
                Upload
            </Link>
          </li>
            <li>
              <UserButton session={session}/>
            </li>
        
        </ul>
      </div>
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div> 
    </div>
    {/* Page content here */}
    <main className='mt-16 z-10'>
        {children}
    </main>
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-4 w-80 min-h-full bg-base-200">
      {/* Sidebar content here */}
      <li><a>Sidebar Item 1</a></li>
      <li><a>Sidebar Item 2</a></li>
    </ul>
  </div>
</div>
  )
}

export default Drawer