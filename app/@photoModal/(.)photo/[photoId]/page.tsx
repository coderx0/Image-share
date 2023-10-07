import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'
import PageModal from './pageModal'

interface Props{
    params:{
      photoId:string
    }
}

const Page = async ({params}:Props) => {

  const post = await db.post.findFirst({
    where: {
      id: params.photoId
    },
    include: {
      author: true
    }
  });

  if(!post){
    return notFound();
  }

  return (
  <PageModal post={post}/>
  )
}

export default Page

