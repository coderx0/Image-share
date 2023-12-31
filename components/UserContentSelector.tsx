"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'

const UserContentSelector = ({userId}:{userId: string}) => {
    const pathName = usePathname();
    return (
      <div className='mt-4 w-full flex justify-center items-center'>
          <div className='flex gap-4 overflow-y-hidden overflow-x-auto max-w-[90vw]'>
            <Link prefetch href={`/user/${userId}`} className={`btn py-1 px-3 text-base-content ${pathName === `/user/${userId}` ?'btn-primary text-primary-800':'btn-ghost'}`}>
              Gallery
            </Link >
            <Link prefetch href={`/user/${userId}/collections`} className={`btn py-1 px-3 text-base-content ${pathName === `/user/${userId}/collections` ?'btn-primary text-primary-800':'btn-ghost'}`}>
              Collections
            </Link >
            <Link prefetch href={`/user/${userId}/followers`}  className={`btn py-1 px-3 text-base-content ${pathName === `/user/${userId}/followers` ?'btn-primary text-primary-800':'btn-ghost'}`}>
              Followers
            </Link >
            <Link prefetch href={`/user/${userId}/following`}  className={`btn py-1 px-3 text-base-content ${pathName === `/user/${userId}/following` ?'btn-primary text-primary-800':'btn-ghost'}`}>
              Following
            </Link >
          </div>
        </div>
    )
}

export default UserContentSelector