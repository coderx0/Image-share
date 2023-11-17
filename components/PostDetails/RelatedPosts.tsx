import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useCallback } from 'react'
import { toast } from 'sonner';
import FeedLayout from '../HomeFeed/FeedLayout';
import Link from 'next/link';

interface Props{
    title: string,
    id: string,
    tags: string[]
}
const RelatedPosts = ({title,id,tags}: Props) => {
    const fetchRelatedPosts = useCallback(async ()=>{
        try{
            const response = await axios.get(`/api/post/relatedPosts/${id}`)
            return response.data;
        }
        catch(err){
            toast.error("Unable to fetch related posts")
        }
    },[]);

  const {data, isLoading,refetch} = useQuery([`${title}_related`],fetchRelatedPosts)

  return (
    <div className='mt-8'>
        <h3 className='p-4 text-xl'>Related Posts</h3>
        <div className='flex gap-4 overflow-auto md:overflow-hidden max-w-[90vw] p-2 px-3'>  
        {
            tags.map(tag=><Link href={`/search/${tag}`} prefetch  className='btn btn-sm md:btn-md btn-outline text-base-content normal-case'>
            {tag}
          </Link >)
        }
        </div>
        {
            data ? <FeedLayout posts={data.relatedPosts}/> : null
        }
    </div>
  )
}

export default RelatedPosts