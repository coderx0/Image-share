import PostFeed from '@/components/HomeFeed/PostFeed'
import { INITIAL_POST_NUMBER } from '@/lib/constants'
import { db } from '@/lib/db'
import React from 'react'

interface Props {
  params:{
    searchParam: string
  }
}

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

const page = async ({params}: Props) => {

  const postsOfTag = await db.tag.findFirst({
    where:{
      name: {
        startsWith: params.searchParam,
      }
    },
    include:{
      posts:{
        include: {
          author: true
        },
        take: INITIAL_POST_NUMBER
      }
    }
  })


  // const posts = await db.post.findMany({
  //   where:{
  //     title:{
  //       startsWith: params.searchParam
  //     },
  //   },
  //   include:{
  //     author: true
  //   },
  //   take: INITIAL_POST_NUMBER
  // })

  if(!postsOfTag){
    return (
      <div>
        No Result Found
      </div>
    )
  }

  return (
    <PostFeed initialPosts={postsOfTag.posts.reverse()} endpoint={`/search/${params.searchParam}`} shouldFetchNext={postsOfTag.posts.length === INITIAL_POST_NUMBER}/>
  )
}

export default page