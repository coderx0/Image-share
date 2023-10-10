import { Like, User  } from '@prisma/client'
import { Bookmark, Download, Heart, Share2, User as UserIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import PostLike from './PostLike'

interface Props {
    title: string,
    imageUrl: string,
    imageId: string,
    likes: Like[],
    author: User,
    postId: string
}

const PostDetails = async({
    title, imageUrl, imageId, likes, author,postId
}: Props) => {
  return (
    <div className='p-6'>
        <div className='flex'>
            <div className='flex flex-1 gap-2 items-start'>
                <div className="bg-red-100 w-12 h-12 flex justify-center items-center rounded-full">
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
                    <button className='btn btn-ghost btn-sm p-2 text-gray-500 font-normal hover:text-dark'>
                        Follow
                    </button>
                </div>
            </div>
            <div className='flex gap-2'>
                <button className='btn rounded-md '>
                    <Bookmark/>
                    <span>
                        Collect
                    </span>
                </button>
                <PostLike likes={likes} postId={postId}/>
                <button className='btn btn-primary rounded-md'>
                    <Download/>
                    <span>
                        Download
                    </span>
                </button>
            </div>
        </div>
        <div className='flex justify-center mt-4'>
            <div className='max-w-[500px]'>
                <img src={imageUrl} className='object-contain'/>
            </div>
        </div>
        <div className='flex justify-end mt-4'>
            <button className='btn rounded-md'>
                <Share2/>
                <span>Share</span>
            </button>
        </div>
    </div>
  )
}

export default PostDetails