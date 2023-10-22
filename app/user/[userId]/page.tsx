import PostFeed from '@/components/HomeFeed/PostFeed'
import { INITIAL_POST_NUMBER } from '@/lib/constants'
import { db } from '@/lib/db'
import React from 'react'

interface Props{
    params:{
        userId: string
    }
}


// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'


const page = async({params}: Props) => {
  const posts = await db.post.findMany({
    where:{
        authorId: params.userId
    },
    include:{
        author: true
    },
    take: INITIAL_POST_NUMBER
  })

  if(!posts || posts.length===0){
    return <div className='p-8 flex justify-center items-center h-36'>
      <h4 className='text-3xl font-semibold'>
      No Posts yet. Upload Some !!!
      </h4>
    </div>
  }

    return (
    <PostFeed initialPosts={posts.reverse()} endpoint={`/user/${params.userId}/posts`} shouldFetchNext={posts.length === INITIAL_POST_NUMBER}/>
  )
}

export default page