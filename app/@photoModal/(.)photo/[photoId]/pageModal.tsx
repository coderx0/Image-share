"use client"
import React from 'react'
import PostDetails from '@/components/PostDetails/PostDetails'
import { User } from '@prisma/client'
import { useClickOutside } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

interface Props{
    post: {
        title: string,
        imageUrl: string,
        id: string,
        author: User,
        likes: number
    }
}

const PageModal = ({post}: Props) => {
    const ref = useClickOutside(()=>outSideClickHandler());
    const router = useRouter();

    const outSideClickHandler = ()=>{
        console.log("clicked outside ddi")
        router.back();
    }

  return (
    <div
    className='fixed z-40 backdrop-blur-md top-0 bottom-0 left-0 right-0 w-full flex justify-center items-center'>
    <div className='w-[90%] bg-blue-300 p-6' ref={ref} onClick={e=>e.stopPropagation()}>
      <PostDetails 
        title={post.title}
        imageId={post.id}
        imageUrl={post.imageUrl}
        author={post.author}
        likes={post.likes}
      />
    </div>
  </div>
  )
}

export default PageModal