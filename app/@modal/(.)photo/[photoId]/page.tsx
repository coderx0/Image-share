import { notFound } from 'next/navigation'
import React,{FC} from 'react'
import PageModal from '@/components/PageModal'
import { db } from '@/lib/db'
import { redis } from '@/lib/redis'

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
      }
    });
    console.log('from db');
  }

  if(!post){
    return notFound();
  }

  return (
    //@ts-ignore
  <PageModal post={post}/>
  )
}

export default page

