// "use client"

import { notFound } from 'next/navigation'
import React,{FC} from 'react'
import PageModal from '@/components/PageModal'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { db } from '@/lib/db'
import { redis } from '@/lib/redis'
import { Like, User } from '@prisma/client'

interface Props{
    params:{
      photoId:string
    }
}

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'


const page:FC<Props> = async ({params}) => {
  
  let post = await redis.hgetall(`postDetails_${params.photoId}`)

  if(!post){
    post = await db.post.findFirst({
      where: {
        id: params.photoId
      },
      include: {
        author: true,
        likes: true
      }
    });
    console.log('from db');
  }

  if(!post){
    return notFound();
  }
  // const fetchPostDetails = async ()=>{
  //   try{
  //       const response = await axios.get(`/api/post/${params.photoId}`)
  //       return response.data;
  //   }
  //   catch(err){
  //       toast.error("Unable to fetch Post details")
  //   }
  // };

  // const {data, isLoading} = useQuery([`post_${params.photoId}`],fetchPostDetails)

  // console.log({data})


  // if(isLoading){
  //   return null
  // }

  return (
    //@ts-ignore
  <PageModal post={post}/>
  )
}

export default page

