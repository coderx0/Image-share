'use client'

import { ExtendedPost } from '@/types/db'
// import { useIntersection } from '@mantine/hooks'
// import { useInfiniteQuery } from '@tanstack/react-query'
// import axios from 'axios'
// import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import Post from './Post'
import Masonry from 'react-masonry-css'

interface PostFeedProps {
  initialPosts: ExtendedPost[],
  endpoint: string
}

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  500: 1
};

const PostFeed: FC<PostFeedProps> = ({ initialPosts,endpoint }) => {
  // const lastPostRef = useRef<HTMLElement>(null)
  // const { ref, entry } = useIntersection({
  //   root: lastPostRef.current,
  //   threshold: 1,
  // })
  // const [stopFetch, setStopFetch] = useState(false);


  // const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
  //   ['infinite-query'],
  //   async ({ pageParam = 1 }) => {
  //     const query = `/api/${endpoint}?limit=${4}&page=${pageParam}`
      
  //     const { data } = await axios.get(query)

  //     if(data.length === 0){
  //       setStopFetch(true)
  //     }

  //     return data as ExtendedPost[]
  //   },

  //   {
  //     getNextPageParam: (_, pages) => {
  //       return pages.length + 1
  //     },
  //     initialData: { pages: [initialPosts], pageParams: [1] },
  //   }
  // )

  // useEffect(() => {
  //   if (entry?.isIntersecting && !stopFetch && !isFetchingNextPage && initialPosts.length > 3) {
  //     fetchNextPage()
  //   }
  // }, [entry, fetchNextPage,stopFetch,isFetchingNextPage])

  // const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <>
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
          {
        initialPosts.map((post,index)=>{
          if(index === initialPosts.length - 1){
            return (
              <div key={post.id}>
                <Post id={post.id} title={post.title} imageUrl={post.imageUrl} author={post.author}/>
              </div>
            )
          }
          else{
            return (
              <div key={post.id}>
                <Post id={post.id} title={post.title} imageUrl={post.imageUrl} author={post.author}/>
              </div>
            )
          }
        })
        }
    </Masonry>
      {/* <div className='flex gap-4 flex-wrap px-12 justify-center items-start pt-6 pb-12'>
        {
        initialPosts.map((post,index)=>{
          if(index === initialPosts.length - 1){
            return (
              <div key={post.id}>
                <Post id={post.id} title={post.title} imageUrl={post.imageUrl}/>
              </div>
            )
          }
          else{
            return (
              <div key={post.id}>
                <Post id={post.id} title={post.title} imageUrl={post.imageUrl}/>
              </div>
            )
          }
        })
        }
    </div> */}

      {/* {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )} */}
    </>
  )
}

export default PostFeed
