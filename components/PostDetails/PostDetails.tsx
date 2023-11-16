"use client"

import {  User  } from '@prisma/client'
import { Bookmark, Download, Heart, User as UserIcon } from 'lucide-react'
import React, { useState } from 'react'
import PostLike from './PostLike'
import CollectPost from '../CollectPost'
import PostAuthor from './PostAuthor'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import FileSaver from "file-saver"
import SharePost from './SharePost'
import { transformCloudinaryURL } from '@/lib/transformCloudinaryURL'
import RelatedPosts from './RelatedPosts'
interface Props {
    title: string,
    imageUrl: string,
    imageId: string,
    author: User,
    postId: string,
    tags: string[]
}

const PostDetails = ({
    title, imageUrl, imageId, author,postId,tags
}: Props) => {
    const {data: session} = useSession()
    const [isHQ,setIsHQ] =  useState(false);
    const finalImgURL = isHQ ? imageUrl : transformCloudinaryURL(imageUrl) || '';

  return (
    <>
        <div className='p-4 md:p-6 '>
        <div className='flex'>
            <div className='flex flex-1 gap-2 items-start'>
                <PostAuthor author={author}/>
            </div>
            <div className='hidden md:flex gap-2 w-full md:w-fit'>
                {
                    session ? (
                    <CollectPost postId={postId} showText style='h-12 w-28 gap-2 rounded-md'/>
                    ):(
                        <Link href='/sign-in' className='btn rounded-md p-2 px-3 bg-base-200 h-12 w-28 gap-2 hover:bg-primary hover:text-primary-800 normal-case'>
                            <Bookmark/>
                            <span>Collect</span>
                        </Link>
                    )
                }

                {
                    session ? (
                    <PostLike postId={postId} style='h-12 w-24 gap-2 rounded-md font-semibold' showText/>
                    ):(
                        <Link href='/sign-in' className='btn rounded-md p-2 px-3 bg-base-200 h-12 w-24 gap-2 hover:bg-primary hover:text-primary-800 normal-case'>
                            <Heart/>
                            <span>Like</span>
                        </Link>
                    )
                }
                
                <SharePost imageId={imageId} style='rounded-md'/>
                <div className='flex flex-1 justify-end rounded-none'>
                <button
                onClick={()=>FileSaver.saveAs(imageUrl,`${title}.jpg`)} 
                className='btn rounded-md hover:bg-primary hover:text-primary-800'>
                    <Download/>
                    <span className='hidden md:block'>
                        Download
                    </span>
                </button>
                </div>
            </div>
        </div>
        <div className=' flex justify-center mt-4 bg-base-100'>
            <div className='relative max-h-[550px] flex justify-center'>
                <img src={finalImgURL} className='h-full w-auto object-contain'/>
                <div className='absolute bottom-0 w-full flex justify-end'>
                    <button className={`btn btn-sm m-2 ${isHQ?'btn-primary':'btn-neutral'}`} 
                    onClick={()=>setIsHQ(prev=>!prev)}>
                        HQ
                    </button>
                </div>
            </div>
        </div>
        <div className='flex md:hidden flex-1 justify-center items-center mt-4'>
        {
                    session ? (
                    <CollectPost showText={false} postId={postId} style='h-12 w-12 rounded-full rounded-r-none'/>
                    ):(
                        <Link href='/sign-in' className='btn rounded-full rounded-r-none p-2 px-3 bg-base-200 hover:bg-primary hover:text-primary-800'>
                            <Bookmark/>
                        </Link>
                    )
                }

                {
                    session ? (
                    <PostLike postId={postId} style='h-12 w-12 rounded-none'/>
                    ):(
                        <Link href='/sign-in' className='btn rounded-none p-2 px-3 bg-base-200 hover:bg-primary hover:text-primary-800'>
                            <Heart/>
                        </Link>
                    )
                }
                
                <SharePost imageId={imageId} style='rounded-none'/>
                <div className='flex justify-end rounded-none'>
                <button
                onClick={()=>FileSaver.saveAs(imageUrl,`${title}.jpg`)} 
                className='btn rounded-full rounded-l-none hover:bg-primary hover:text-primary-800'>
                    <Download/>
                    <span className='hidden md:block'>
                        Download
                    </span>
                </button>
                </div>
        </div>
        <RelatedPosts title={title} id={imageId}/>
    </div>
    </>
  )
}

export default PostDetails