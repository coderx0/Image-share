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
    return <div>
        No Posts
    </div>
  }

    return (
    <PostFeed initialPosts={posts.reverse()} endpoint={`/user/${params.userId}/posts`} shouldFetchNext={posts.length === INITIAL_POST_NUMBER}/>
  )
}

export default page