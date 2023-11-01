import FeedContentSelector from '@/components/FeedContentSelector'
import FollowUser from '@/components/FollowUser'
import { db } from '@/lib/db'
import { transformCloudinaryURL } from '@/lib/transformCloudinaryURL'
import { Post } from '@prisma/client'
import Link from 'next/link'
import React, { use } from 'react'

interface TopUser {
  id: string,
  username: string | null,
  image: string | null,
  totalLikedReceived: number,
  Post: Post[],
  _count: {
    Post: number
  }
}

const LeaderBoardPage = async()=> {
  const topUsers = await db.user.findMany({
    where:{
    Post:{
        some: {}
      }
    },
    select:{
      id: true,
      Post: {
        take:3
      },
      username: true,
      image: true,
      totalLikedReceived: true,
      _count:{
        select:{
          Post: true
        }
      }
    },
    orderBy:{
      totalLikedReceived: 'desc'
    },
  });

  return (
    <>
      <FeedContentSelector/>
      <div className='p-4 md:px-12 flex flex-col items-center mt-4 md:mt-10 '>
        <h1 className='text-center md:text-2xl'>Users with most number of likes received on their posts.</h1>
        <div className='w-full mt-10'>
          {
            topUsers.map((user:TopUser,idx: number)=>(
              <div key={user.id} className='mb-10'>
                <div className='flex items-center gap-4'>
                  <h3 className='text-lg md:text-2xl'>{idx+1}</h3>
                  <Link href={`/user/${user.id}`}>
                  <div className='w-16 h-16 md:w-24 md:h-24'>
                      <img src={transformCloudinaryURL(user.image || '') || ''} alt='' className='h-full w-full rounded-full object-cover'/>
                  </div>
                  </Link>
                  <div className=''>
                    <div className='flex gap-4'>
                      <Link href={`/user/${user.id}`}>
                        <h4 className='text-md md:text-xl'>{user.username}</h4>
                      </Link>
                      <FollowUser userId={user.id} style='btn-sm '/>
                    </div>
                      <p className='text-sm md:mt-2 text-base-content/60'>{user.totalLikedReceived} Likes</p>
                  </div>
                </div>
                
                <div className='flex mt-6 gap-2 h-[200px] md:h-[300px] overflow-auto scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-100'>
                  {
                    user.Post.map((post)=>(
                        <img 
                        key={post.id}
                        width={200}
                        height={300}
                        className='w-[200px] md:w-[300px] object-cover rounded-md block'
                        src={transformCloudinaryURL(post.imageUrl) || ''} alt=''/>
                    ))
                  }
                  <Link href={`/user/${user.id}`}>
                  <div className='w-[300px] btn h-full rounded-md flex-col normal-case gap-4 overflow-hidden group'>
                    <p className='text-3xl group-hover:scale-150 transition-transform duration-150'>
                      {user._count.Post}
                    </p>
                    <p className='group-hover:scale-150 transition-transform duration-150'>View All Posts</p>
                  </div>
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default LeaderBoardPage