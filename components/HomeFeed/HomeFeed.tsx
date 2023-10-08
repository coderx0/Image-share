import { db } from '@/lib/db'
import React from 'react'
import PostFeed from './PostFeed'

const HomeFeed = async() => {
    const posts = await db.post.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          author: true,
        },
        // take: 4,
      })

  return (
    <>
    <PostFeed initialPosts={posts} endpoint='/post'/>
    </>
  )
}

export default HomeFeed