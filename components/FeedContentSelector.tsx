"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const FeedContentSelector = () => {
    const pathName = usePathname();
  return (
    <div className='mt-4 w-full flex justify-center items-center'>
        <div className='flex gap-4 overflow-auto max-w-[90vw]'>
          <Link href='/' className={`btn py-1 px-3 ${pathName === '/' ?'btn-primary':'btn-ghost'}`}>
            Home
          </Link >
          <Link href='/leaderboard' className={`btn py-1 px-3 ${pathName === '/leaderboard' ?'btn-primary':'btn-ghost'}`}>
            LeaderBoard
          </Link >
          <Link href='/challenges' className={`btn py-1 px-3 ${pathName === '/challenges' ?'btn-primary':'btn-ghost'}`}>
            Challenges
          </Link >
          <Link href='/myfeed'  className={`btn py-1 px-3 ${pathName === '/myfeed' ?'btn-primary':'btn-ghost'}`}>
            My Feed
          </Link >
        </div>
      </div>
  )
}

export default FeedContentSelector