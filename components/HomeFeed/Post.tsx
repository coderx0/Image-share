import React from 'react'
import {Avatar, Image} from "@nextui-org/react";
import { Bookmark, Download, Heart } from 'lucide-react';
import Link from 'next/link';
import {  User } from '@prisma/client';
import CollectPost from '../CollectPost';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PostLike from '../PostDetails/PostLike';

interface Props {
    title: string,
    imageUrl: string,
    id: string,
    author: User,
}

const Post = ({title, imageUrl,id,author}: Props) => {
  const {data: session} = useSession();
  const router = useRouter();

  return (
      <div className='group relative'>
      <div className='absolute top-0 z-20 left-0 hidden group-hover:flex gap-2 w-full justify-end p-2'>
        {
          session ? (
            <PostLike postId={id}/>
          )
          :
          (
        <button className='btn rounded-lg p-2 px-3 bg-base-100' onClick={()=>router.push("/sign-in")}>
          <Heart/>
        </button>
          )
        }
        {
          session? (
            <CollectPost postId={id}/>
          )
          :
          (
            <button className='btn rounded-lg p-2 px-3 bg-base-100' onClick={()=>router.push("/sign-in")}>
              <Bookmark/>
            </button>
          )
        }
      </div>
      <div className='absolute bottom-0 z-20 left-0 bg-gradient-to-t from-[#2d3436] to-transparent hidden group-hover:flex gap-2 w-full justify-between p-2'>
        <Link href={`/user/${author.id}`}>
          <div className='flex items-center gap-2 text-white'>
            <Avatar showFallback name={author.name!} src={author.image!}/>
            <span className=''>
              {author.name}
            </span>
          </div>
        </Link>
        <button className='btn rounded-lg p-2 px-3 bg-base-100'>
          <Download/>
        </button>
      </div>
    <Link href={`/photo/${id}`} prefetch={true}>
      <div className='max-w-[500px]'>
          <Image
            alt={title}
            src={imageUrl}
            className='z-1 rounded-none'
          />
      </div>
    </Link>
    </div>
  )
}

export default Post