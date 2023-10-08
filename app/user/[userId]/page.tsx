import PostFeed from '@/components/HomeFeed/PostFeed'
import { db } from '@/lib/db'
import React from 'react'

interface Props{
    params:{
        userId: string
    }
}


export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'


const page = async({params}: Props) => {
  const posts = await db.post.findMany({
    where:{
        authorId: params.userId
    },
    include:{
        author: true
    },
    // take:4
  })

  if(!posts || posts.length===0){
    return <div>
        No Posts
    </div>
  }

    return (
    <PostFeed initialPosts={posts} endpoint={`/user/${params.userId}/posts`}/>
  )
}

export default page