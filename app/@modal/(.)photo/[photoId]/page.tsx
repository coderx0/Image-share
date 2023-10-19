"use client"

// import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React,{FC} from 'react'
import PageModal from '@/components/PageModal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

interface Props{
    params:{
      photoId:string
    }
}

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'


const page:FC<Props> = ({params}) => {

  // const post = await db.post.findFirst({
  //   where: {
  //     id: params.photoId
  //   },
  //   include: {
  //     author: true,
  //     likes: true
  //   }
  // });

  const fetchPostDetails = async ()=>{
    try{
        const response = await axios.get(`/api/post/${params.photoId}`)
        return response.data;
    }
    catch(err){
        toast.error("Unable to fetch Post details")
    }
  };

  const {data, isLoading} = useQuery([`post_${params.photoId}`],fetchPostDetails)

  console.log({data})

  // if(!post){
  //   return notFound();
  // }

  if(isLoading){
    return null
  }

  return (
  <PageModal post={data?.postDetails}/>
  )
}

export default page

