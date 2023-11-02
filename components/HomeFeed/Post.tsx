import React from 'react'
import {Avatar, Image} from "@nextui-org/react";
import { Bookmark, Download, Heart } from 'lucide-react';
import Link from 'next/link';
import {  User } from '@prisma/client';
import CollectPost from '../CollectPost';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PostLike from '../PostDetails/PostLike';
import FileSaver from 'file-saver';
import { transformCloudinaryURL } from '@/lib/transformCloudinaryURL';

interface Props {
    title: string,
    imageUrl: string,
    id: string,
    author: User,
}

// function transformCloudinaryURL(inputURL:string, width = 500) {
//   // Check if the input URL is in the expected format
//   if (!inputURL.startsWith("http://res.cloudinary.com/calmbit/image/upload/")) {
//     return "Invalid input URL";
//   }

//   // Split the URL into parts
//   const parts = inputURL.split("/");

//   // Extract the necessary components
//   const cloudName = parts[3];
//   const publicID = parts[parts.length - 1];
//   const version = parts[parts.length - 2];

//   // Construct the transformed URL
//   const transformedURL = `https://res.cloudinary.com/${cloudName}/image/upload/c_scale,w_${width}/f_auto/q_auto/${version}/${publicID}`;

//   return transformedURL;
// }


const Post = ({title, imageUrl,id,author}: Props) => {
  const {data: session} = useSession();
  const router = useRouter();

  const imgURL = transformCloudinaryURL(imageUrl) || '';
  return (
      <div className='group relative'>
      <div className='absolute top-0 z-20 left-0 hidden group-hover:flex gap-2 w-full justify-end p-2'>
        {
          session ? (
            <PostLike postId={id} style='h-10 w-10'/>
          )
          :
          (
        <button className='bg-base-200 flex justify-center items-center rounded-md h-10 w-10' onClick={()=>router.push("/sign-in")}>
          <Heart/>
        </button>
          )
        }
        {
          session? (
            <CollectPost postId={id} style='h-10 w-10 rounded-md'/>
          )
          :
          (
            <button className='bg-base-200 flex justify-center items-center rounded-md h-10 w-10' onClick={()=>router.push("/sign-in")}>
              <Bookmark/>
            </button>
          )
        }
      </div>
      <div className='absolute bottom-0 z-20 left-0 bg-gradient-to-t from-[#2d3436] to-transparent hidden group-hover:flex gap-2 w-full justify-between p-2 rounded-xl'>
        <Link href={`/user/${author.id}`}>
          <div className='flex items-center gap-2 text-white'>
            <Avatar showFallback name={author.name!} src={transformCloudinaryURL(author.image || '') || ''}/>
            <span className=''>
              {author.name}
            </span>
          </div>
        </Link>
        <button
         onClick={()=>FileSaver.saveAs(imageUrl,`${title}.jpg`)}
         className='bg-base-200 flex justify-center items-center rounded-md h-10 w-10'>
          <Download/>
        </button>
      </div>
    <Link href={`/photo/${id}`} prefetch={true}>
      <div className='max-w-[500px]'>
          <Image
            alt={title}
            src={imgURL}
            className='z-1'
          />
      </div>
    </Link>
    </div>
  )
}

export default Post