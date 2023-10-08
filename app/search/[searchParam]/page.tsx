import PostFeed from '@/components/HomeFeed/PostFeed'
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
    // take: 4
  })

  if(posts.length === 0){
    return (
      <div>
        No Result Found
      </div>
    )
  }
  return (
    // <div>
    //   {
    //     posts.map(post=><div key={post.id}>{post.title}
    //     <div>
    //       <img src={post.imageUrl}/>
    //     </div>
    //     </div>)
    //   }
    // </div>
    <PostFeed initialPosts={posts} endpoint={`/search/${params.searchParam}`}/>
  )
}

export default page