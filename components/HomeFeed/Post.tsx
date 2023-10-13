import React from 'react'
import {Avatar, Button, Image} from "@nextui-org/react";
import { Bookmark, Download, Heart } from 'lucide-react';
import Link from 'next/link';
import { User } from '@prisma/client';

interface Props {
    title: string,
    imageUrl: string,
    id: string,
    author: User
}

const Post = ({title, imageUrl,id,author}: Props) => {
  return (
      <div className='group relative bg-red-100'>
      <div className='absolute top-0 z-20 left-0 hidden group-hover:flex gap-2 w-full justify-end p-2'>
        <button className='btn rounded-lg p-2 px-3 bg-base-100'>
          <Heart/>
        </button>
        <button className='btn rounded-lg p-2 px-3 bg-base-100'>
          <Bookmark/>
        </button>
      </div>
      <div className='absolute bottom-0 z-20 left-0 bg-gradient-to-t from-[#2d3436] to-transparent hidden group-hover:flex gap-2 w-full justify-between p-2'>
        <Link href={`/user/${author.id}`}>
          <div className='flex items-center gap-2 text-white'>
            <Avatar showFallback name={author.name!} src={author.image!}/>
            <span>
              {author.name}
            </span>
          </div>
        </Link>
        <button className='btn rounded-lg p-2 px-3 bg-base-100'>
          <Download/>
        </button>
      </div>
    <Link href={`/photo/${id}`}>
      <div className='max-w-[500px]'>
          {/* <img src={imageUrl} className='object-contain'/> */}
          <Image
            // width={240}
            alt={title}
            src={imageUrl}
            className='z-1'
          />
      </div>
    </Link>
    </div>
  )
}

export default Post