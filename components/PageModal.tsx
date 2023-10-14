"use client"
import React, { useEffect } from 'react'
import PostDetails from '@/components/PostDetails/PostDetails'
import { Like, User } from '@prisma/client'
import { useClickOutside } from '@mantine/hooks'
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

  const ref = useClickOutside(() => outSideClickHandler());
  const router = useRouter();

  const outSideClickHandler = ()=>{
      router.back();
  }

  useEffect(()=>{
    //@ts-ignore
    document.getElementById('my_modal_2').showModal()
  },[])

  return (
    <>
      <dialog id="my_modal_2" className="modal backdrop-brightness-[0.2]">
        {/* <div className="modal-action flex justify-end w-full">
          <form method="dialog">
            <button className="btn btn-circle btn-error"><X/></button>
          </form>
        </div> */}
        <div className="modal-box w-full lg:w-[90%] max-w-[1200px] p-2 rounded-lg relative">
          <PostDetails 
          postId={post.id}
          title={post.title}
          imageId={post.id}
          imageUrl={post.imageUrl}
          author={post.author}
          likes={post.likes}
        />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default PageModal