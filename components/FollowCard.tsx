"use client" 

import { Avatar } from '@nextui-org/react'
import { User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const FollowCard = ({follower}:{follower: User}) => {
  return (
    <div key={follower.id} className='w-72 h-72 bg-base-200 rounded-xl flex flex-col relative'>
            <div className='flex-1 bg-accent rounded-t-xl'/>
            <div className='absolute top-[40%] left-[40%]'>
                {
                    follower.image ?
                <Avatar showFallback src={follower.image} size='lg'/>
                :
                <Avatar name={follower.name!} size='lg'/>
                }
            </div>
            <div className='flex flex-1 flex-col bg-primary rounded-b-xl'>
                <h4 className='text-primary-content text-center mt-8'>
                    {follower.name}
                </h4>
                <div className='flex justify-center mt-4'>
                <Link href={`/user/${follower.id}`} className='btn px-6'>
                    Visit
                </Link>
                </div>
            </div>
    </div>
  )
}

export default FollowCard