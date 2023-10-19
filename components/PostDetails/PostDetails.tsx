"use client"

import { Like, User  } from '@prisma/client'
import { Bookmark, Download, Heart, Share2, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import PostLike from './PostLike'
import CollectPost from '../CollectPost'
import PostAuthor from './PostAuthor'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface Props {
    title: string,
    imageUrl: string,
    imageId: string,
    likes: Like[],
    author: User,
    postId: string
}

const PostDetails = ({
    title, imageUrl, imageId, likes, author,postId
}: Props) => {
    const {data: session} = useSession()
    const router = useRouter()
  return (
    <>
        <div className='p-2 md:p-6'>
        <div className='flex'>
            <div className='hidden md:flex flex-1 gap-2 items-start'>
                {/* <div className="bg-red-100 w-12 h-12 flex justify-center items-center rounded-full">
                    {
                        author.image ? (<img src={author.image} className='rounded-full'/>):
                        (
                            <UserIcon className=''/>
                        )
                    }
                </div>
                <div className='flex flex-col items-start'>
                    <Link href={`/user/${author.id}`} className='cursor-pointer'>
                    <span className='font-semibold text-lg pl-2'>
                        {author.name}
                    </span>
                    </Link>
                    <button className='btn btn-ghost btn-sm p-2 text-base-content/60 font-normal hover:text-dark'>
                        Follow
                    </button>
                </div> */}
                <PostAuthor author={author}/>
            </div>
            <div className='flex gap-2 w-full md:w-fit'>
                {
                    session ? (
                    <CollectPost postId={postId}/>
                    ):(
                        <button className='btn rounded-lg p-2 px-3 bg-base-200' onClick={()=>router.push("/sign-in")}>
                            <Bookmark/>
                        </button>
                    )
                }
                
                <PostLike likes={likes} postId={postId}/>
                <button className='btn rounded-md md:hidden'>
                <Share2/>
                </button>
                <div className='flex flex-1 justify-end'>
                <button className='btn btn-primary rounded-md'>
                    <Download/>
                    <span className='hidden md:block'>
                        Download
                    </span>
                </button>
                </div>
            </div>
        </div>
        <div className='flex justify-center mt-4'>
            <div className='max-h-[550px] flex justify-center'>
                <img src={imageUrl} className='h-full w-auto object-contain'/>
            </div>
        </div>
        <div className='flex md:hidden flex-1 gap-2 items-center mt-4'>
                {/* <div className="bg-red-100 w-12 h-12 flex justify-center items-center rounded-full">
                    {
                        author.image ? (<img src={author.image} className='rounded-full'/>):
                        (
                            <UserIcon className=''/>
                        )
                    }
                </div>
                <div className='flex flex-1 items-center gap-6'>
                    <Link href={`/user/${author.id}`} className='cursor-pointer'>
                    <span className='font-semibold text-md pl-2'>
                        {author.name}
                    </span>
                    </Link>
                    <button className='btn btn-ghost btn-sm text-gray-800 font-normal hover:text-dark rounded-lg'>
                            Follow
                    </button>
                </div> */}
                <PostAuthor author={author}/>
            </div>
        <div className='hidden md:flex justify-end mt-4'>
            <button className='btn rounded-md'>
                <Share2/>
                <span>Share</span>
            </button>
        </div>
    </div>
    </>
  )
}

export default PostDetails