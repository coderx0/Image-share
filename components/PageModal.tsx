"use client"
import React from 'react'
import PostDetails from '@/components/PostDetails/PostDetails'
import { Like, User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'


interface Props{
    post: {
        title: string,
        imageUrl: string,
        id: string,
        author: User,
        likes: Like[]
    }
}

const PageModal = ({post}: Props) => {

  const router = useRouter();

  return (
    <>
    <div
     onClick={()=>{
      router.back();
     }}
     className='backdrop-brightness-[0.2] fixed top-0 left-0 w-[100vw] h-[100vh] z-40 flex justify-center items-center text-base-content'>
      <button className='absolute btn btn-circle top-0 md:right-[30px] border-2 border-red-400'>
        <X/>
      </button>
      <div
      onClick={e=>e.stopPropagation()}
       className='bg-base-100 pb-4 md:p-4 rounded-lg md:w-[1200px]'>
        <PostDetails 
          postId={post.id}
          title={post.title}
          imageId={post.id}
          imageUrl={post.imageUrl}
          author={post.author}
          likes={post.likes}
          />
      </div>
    </div>
    </>
  )
}

export default PageModal