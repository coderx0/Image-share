import PostDetails from '@/components/PostDetails/PostDetails'
import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'

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
      likes: true
    }
  });

  if(!post){
    return notFound();
  }

  return (
    <div>
      <PostDetails 
        postId={post.id}
        title={post.title}
        imageId={post.id}
        imageUrl={post.imageUrl}
        author={post.author}
        likes={post.likes}
      />
    </div>
  )
}

export default Page