import FeedContentSelector from '@/components/FeedContentSelector'
import PostFeed from '@/components/HomeFeed/PostFeed'
import { getAuthSession } from '@/lib/auth'
import { INITIAL_POST_NUMBER } from '@/lib/constants'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

const page = async () => {

  const session  = await getAuthSession();
  if(!session){
    return redirect('/');
  }

  const followingUsers = await db.follow.findMany({
    where:{
      followerId: session.user.id
    }
  })

  if(followingUsers.length === 0){
    return (
      <div className='flex justify-center items-center w-full h-72'>
        <h3 className='text-3xl'>
        Follow some people to get custom feed
        </h3>
      </div>
    )
  }


  const followingUsersIds = followingUsers.map(user=>user.followingId);

  const posts = await db.post.findMany({
    where:{
        authorId: {
            in: followingUsersIds
        }
    },
    include:{
      author: true
    },
    take: INITIAL_POST_NUMBER
  })
  
  if(posts.length === 0){
    return (
      <div className='flex justify-center items-center w-full h-72'>
        <h3 className='text-3xl'>
          No Posts
        </h3>
      </div>
    )
  }

  return (
<div>
<FeedContentSelector/>
<h3 className='text-center text-lg md:text-2xl mt-8'>Your Feed</h3>
<p className='text-center mt-2 mb-8 text-[10px] md:text-[12px] lg:text-sm'>Posts uploaded by the users you follow will appear here</p>
<div className='md:px-10'>
<PostFeed initialPosts={posts.reverse()} endpoint={`/customfeed`} shouldFetchNext={posts.length === INITIAL_POST_NUMBER}/>
</div>
</div> 
)
}

export default page