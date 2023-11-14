import PostFeed from '@/components/HomeFeed/PostFeed'
import { INITIAL_POST_NUMBER } from '@/lib/constants'
import { db } from '@/lib/db'
import Link from 'next/link'
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

  if(!postsOfTag){
    return (
      <div className='w-full h-72 flex flex-col justify-center items-center gap-8'>
        <h2 className='text-lg md:text-2xl p-4 text-center '>
        Could not find anything for "<span className='text-base-content/70'>{params.searchParam.slice(0,30)}{params.searchParam.length>30 && '...'}</span>"
        </h2>
        <div className='flex gap-8'>
        <Link href='/' className='btn rounded-xl w-24'>
          Home
        </Link>
        <Link href='/explore' className='btn rounded-xl w-24'>
          Explore
        </Link>
        </div>
      </div>
    )
  }

  return (
    <div className=''>
      <h3 className='px-4 py-4 md:text-xl lg:text-3xl font-semibold'>
        Beautiful {params.searchParam} photos 
      </h3>
    <PostFeed initialPosts={postsOfTag.posts.reverse()} endpoint={`/search/${params.searchParam}`} shouldFetchNext={postsOfTag.posts.length === INITIAL_POST_NUMBER}/>
    </div>
    )
}

export default page