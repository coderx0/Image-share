"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const FeedContentSelector = () => {
    const pathName = usePathname();
  return (
    <div className='pt-4'>
        <div className='flex justify-center gap-4'>
          <Link href='/' className={`btn ${pathName === '/' ?'btn-primary':'btn-ghost'}`}>
            Home
          </Link >
          <Link href='/leaderboard' className={`btn ${pathName === '/leaderboard' ?'btn-primary':'btn-ghost'}`}>
            LeaderBoard
          </Link >
          <Link href='/challenges' className={`btn ${pathName === '/challenges' ?'btn-primary':'btn-ghost'}`}>
            Challenges
          </Link >
          <Link href='/myfeed'  className={`btn ${pathName === '/myfeed' ?'btn-primary':'btn-ghost'}`}>
            My Feed
          </Link >
        </div>
      </div>
  )
}

export default FeedContentSelector