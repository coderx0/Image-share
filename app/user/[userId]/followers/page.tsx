import FollowCard from '@/components/FollowCard'
import { db } from '@/lib/db'
import React from 'react'

const UserFollowerPage = async({params}:{params:{
  userId: string
}}) => {
  const followers = await db.follow.findMany({
    where:{
      followingId: params.userId
    },
    include:{
      follower: true
    }
  })

  return (
    <div className='p-8 flex flex-wrap gap-4'>
      {
        followers.length === 0 ?
        (
          <div className='w-full flex justify-center items-center h-36'>
            <h4 className='text-3xl font-semibold'>
            No Followers Yet
            </h4>
          </div>
        )
        :
        (
          followers.map(({follower})=>(
            <FollowCard key={follower.id} follower={follower}/>
          ))
        )
      }
    </div>
  )
}

export default UserFollowerPage