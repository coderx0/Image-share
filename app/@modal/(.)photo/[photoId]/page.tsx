import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React,{FC} from 'react'
import PageModal from '@/components/PageModal'

interface Props{
    params:{
      photoId:string
    }
}


export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

const page:FC<Props> = async ({params}) => {

  const post = await db.post.findFirst({
    where: {
      id: params.photoId
    },
    include: {
      author: true,
      likes: true
    }
  });

  if(!post){
    return notFound();
  }

  return (
  <PageModal post={post}/>
  )
}

export default page

