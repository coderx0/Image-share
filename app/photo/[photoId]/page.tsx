import PostDetails from '@/components/PostDetails/PostDetails'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'


// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'


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
      author: true,
      tags: {
        select: {
          name: true
        }
      }
    }
  });

  if(!post){
    return notFound();
  }

  const tags = post.tags.map(tag=>tag.name);

  return (
      <PostDetails 
        postId={post.id}
        title={post.title}
        imageId={post.id}
        imageUrl={post.imageUrl}
        author={post.author}
        tags={tags}
      />
  )
}

export default Page