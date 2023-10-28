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
    const [isHQ,setIsHQ] =  useState(false);
    const finalImgURL = isHQ ? imageUrl : transformCloudinaryURL(imageUrl) || '';

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
                
                <SharePost imageId={imageId}/>
                <div className='flex flex-1 justify-end'>
                <button
                onClick={()=>FileSaver.saveAs(imageUrl,`${title}.jpg`)} 
                className='btn btn-primary rounded-md'>
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
                <img src={finalImgURL} className='h-full w-auto object-contain'/>
            </div>
        </div>
        <div className='flex md:hidden flex-1 gap-2 items-center mt-4'>
                
                <PostAuthor author={author}/>
            </div>
        <div className='flex justify-end'>
            <button className={`btn btn-sm ${isHQ?'bg-primary':'bg-accent'}`} 
            onClick={()=>setIsHQ(prev=>!prev)}>
                HQ
            </button>
        </div>
    </div>
    </>
  )
}

export default PostDetails