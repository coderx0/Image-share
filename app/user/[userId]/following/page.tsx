import FollowCard from '@/components/FollowCard'
import { db } from '@/lib/db'
import React from 'react'

const UserFollowingPage = async({params}:{params:{
  userId: string
}}) => {
  const followers = await db.follow.findMany({
    where:{
      followerId: params.userId
    },
    include:{
      following: true
    }
  })

  return (
    <div className='p-8'>
      {
        followers.length === 0 ?
        (
          <div className='w-full flex justify-center items-center h-36'>
            <h4 className='text-3xl font-semibold'>
            Following No One
            </h4>
          </div>
        )
        :
        (
          followers.map(({following})=>(
            <FollowCard key={following.id} follower={following}/>
          ))
        )
      }
    </div>
  )
}

export default UserFollowingPage