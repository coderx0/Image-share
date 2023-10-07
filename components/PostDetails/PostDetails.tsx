import { User  } from '@prisma/client'
import { Bookmark, Download, Heart, Share2, User as UserIcon } from 'lucide-react'
import React from 'react'

interface Props {
    title: string,
    imageUrl: string,
    imageId: string,
    likes: number,
    author: User
}

const PostDetails = ({
    title, imageUrl, imageId, likes, author
}: Props) => {
  return (
    <div className='p-6'>
        <div className='flex'>
            <div className='flex flex-1 gap-2 items-start'>
                <div className="bg-red-100 w-12 h-12 flex justify-center items-center rounded-full">
                    {
                        author.image ? (<img src={imageUrl} className='rounded-full'/>):
                        (
                            <UserIcon className=''/>
                        )
                    }
                </div>
                <div className='flex flex-col items-start'>
                    <span className='font-semibold text-lg pl-2'>
                        {author.name}
                    </span>
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
                <button className='btn rounded-md '>
                    <Heart/>
                    <span>
                        Likes
                    </span>
                    <span>
                        {likes}
                    </span>
                </button>
                <button className='btn btn-primary rounded-md'>
                    <Download/>
                    <span>
                        Download
                    </span>
                </button>
            </div>
        </div>
        <div className='flex justify-center mt-4'>
            <div className='max-w-[600px]'>
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