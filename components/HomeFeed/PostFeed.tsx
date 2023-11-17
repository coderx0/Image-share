'use client'

import { ExtendedPost } from '@/types/db'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef, useState } from 'react'
import Post from './Post'
import Masonry from 'react-masonry-css'
import { INITIAL_POST_NUMBER } from '@/lib/constants'
import FeedLayout from './FeedLayout'

interface PostFeedProps {
  initialPosts: ExtendedPost[],
  endpoint: string,
  shouldFetchNext: boolean
}

const breakpointColumnsObj = {
  default: 3,
  1000: 2,
  500: 1
};

const PostFeed: FC<PostFeedProps> = ({ initialPosts,endpoint,shouldFetchNext }) => {
  const lastPostRef = useRef<HTMLElement>(null)
  const { ref, entry } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  })
  const [stopFetch, setStopFetch] = useState(false);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    [`${endpoint.slice(1)}`],
    async ({ pageParam = 1 }) => {
      const query = `/api/${endpoint}?limit=${INITIAL_POST_NUMBER}&page=${pageParam}`
      
      const { data } = await axios.get(query)

      if(data.length < INITIAL_POST_NUMBER){
        setStopFetch(true)
      }

      return data as ExtendedPost[]
    },

    {
      getNextPageParam: (_, pages) => {
        return pages.length + 1
      },
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )


  useEffect(() => {
    if (entry?.isIntersecting && !stopFetch && !isFetchingNextPage && shouldFetchNext) {
      fetchNextPage()
    }
  }, [entry, fetchNextPage,stopFetch,isFetchingNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <>
    <FeedLayout posts={posts} lastPostref = {ref}/>
      {isFetchingNextPage && (
        <li className='flex justify-center'>
          <Loader2 className='w-6 h-6 text-zinc-500 animate-spin' />
        </li>
      )}
    </>
  )
}

export default PostFeed
