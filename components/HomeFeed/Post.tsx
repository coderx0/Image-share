import React from 'react'
import {Button, Image} from "@nextui-org/react";
import { Heart } from 'lucide-react';
import Link from 'next/link';

interface Props {
    title: string,
    imageUrl: string,
    id: string
}

const Post = ({title, imageUrl,id}: Props) => {
  return (
    <Link href={`/photo/${id}`}>
      <div className='group relative bg-red-100'>
      <div className='absolute top-0 z-20 flex w-full justify-end p-2'>
        <Button isIconOnly className=''>
          <Heart/>
        </Button>
      </div>
        <div className='max-w-[400px]'>
            {/* <img src={imageUrl} className='object-contain'/> */}
            <Image
              // width={240}
              alt={title}
              src={imageUrl}
              className='z-1'
            />
        </div>
    </div>
    </Link>
  )
}

export default Post