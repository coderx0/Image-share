import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React, { useCallback } from 'react'
import { toast } from 'sonner';
import FeedLayout from '../HomeFeed/FeedLayout';

interface Props{
    title: string,
    id: string,
}
const RelatedPosts = ({title,id}: Props) => {
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
    <div className=''>
        <h3 className='p-4 text-xl'>Related Posts</h3>
        {
            data ? <FeedLayout posts={data.relatedPosts}/> : null
        }
    </div>
  )
}

export default RelatedPosts