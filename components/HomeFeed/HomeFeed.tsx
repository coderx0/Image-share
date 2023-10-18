import { db } from '@/lib/db'
import React from 'react'
import PostFeed from './PostFeed'
import { INITIAL_POST_NUMBER } from '@/lib/constants'


// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'


const HomeFeed = async() => {
    const posts = await db.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: true,
        },
        take: INITIAL_POST_NUMBER,
      })

  return (
    <>
    <PostFeed initialPosts={posts} endpoint='/post' shouldFetchNext={posts.length === INITIAL_POST_NUMBER}/>
    </>
  )
}

export default HomeFeed