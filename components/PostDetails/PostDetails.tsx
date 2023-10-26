"use client"

import {  User  } from '@prisma/client'
import { Bookmark, Download, Heart, Share2, User as UserIcon } from 'lucide-react'
import React from 'react'
import PostLike from './PostLike'
import CollectPost from '../CollectPost'
import PostAuthor from './PostAuthor'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

interface Props {
    title: string,
    imageUrl: string,
    imageId: string,
    author: User,
    postId: string
}

const PostDetails = ({
    title, imageUrl, imageId, author,postId
}: Props) => {
    const {data: session} = useSession()
  return (
    <>
        <div className='p-2 md:p-6'>
        <div className='flex'>
            <div className='hidden md:flex flex-1 gap-2 items-start'>
                <PostAuthor author={author}/>
            </div>
            <div className='flex gap-2 w-full md:w-fit'>
                {
                    session ? (
                    <CollectPost postId={postId}/>
                    ):(
                        <Link href='/sign-in' className='btn rounded-lg p-2 px-3 bg-base-200'>
                            <Bookmark/>
                        </Link>
                    )
                }

                {
                    session ? (
                    <PostLike postId={postId}/>
                    ):(
                        <Link href='/sign-in' className='btn rounded-lg p-2 px-3 bg-base-200'>
                            <Heart/>
                        </Link>
                    )
                }
                
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