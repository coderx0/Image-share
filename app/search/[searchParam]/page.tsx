import PostFeed from '@/components/HomeFeed/PostFeed'
import { INITIAL_POST_NUMBER } from '@/lib/constants'
import { db } from '@/lib/db'
import React from 'react'

interface Props {
  params:{
    searchParam: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const page = async ({params}: Props) => {

  const posts = await db.post.findMany({
    where:{
      title:{
        startsWith: params.searchParam
      },
    },
    include:{
      author: true
    },
    take: INITIAL_POST_NUMBER
  })

  if(posts.length === 0){
    return (
      <div>
        No Result Found
      </div>
    )
  }

  return (
    <PostFeed initialPosts={posts} endpoint={`/search/${params.searchParam}`} shouldFetchNext={posts.length === INITIAL_POST_NUMBER}/>
  )
}

export default page