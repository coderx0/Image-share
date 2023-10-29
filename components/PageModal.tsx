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
     className='backdrop-brightness-[0.2] fixed top-0 left-0 w-[100vw] h-[100vh] z-40 text-base-content overflow-auto'>
      
      <div className='w-full flex justify-center'>
        
      <div
      onClick={e=>e.stopPropagation()}
      className='relative bg-base-100 pb-4 md:p-4 rounded-lg mt-16 md:mt-8 sm:w-[95%] md:w-[90%] max-w-[1200px]'>
        <button
        onClick={()=>{
          router.back();
        }}
        className='absolute btn btn-circle md:btn-lg -top-[50px] left-[10px] md:-top-[20px] md:-left-[20px]'>
          <X strokeWidth={4}/>
        </button>
        <PostDetails 
          postId={post.id}
          title={post.title}
          imageId={post.id}
          imageUrl={post.imageUrl}
          author={post.author}
          />
      </div>
      </div>
    </div>
    </>
  )
}

export default PageModal