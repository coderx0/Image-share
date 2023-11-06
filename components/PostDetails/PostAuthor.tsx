import { transformCloudinaryURL } from '@/lib/transformCloudinaryURL'
import { User } from '@prisma/client'
import { UserIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import FollowUser from '../FollowUser'
import Link from 'next/link'

const PostAuthor = ({author}: {author: User}) => {
    const {data: session} = useSession();
    
  return (
    <>
        <div className="bg-red-100 w-12 h-12 flex justify-center items-center rounded-full">
                    {
                        author.image ? (<img src={transformCloudinaryURL(author.image) || ''} className='rounded-full'/>):
                        (
                            <UserIcon className=''/>
                        )
                    }
                </div>
                <div className='flex flex-col items-start'>
                    <span className='font-semibold text-lg pl-2 cursor-pointer' onClick={()=>
                        location.assign(`${process.env.NEXT_PUBLIC_CLIENT_URL}/user/${author.id}`)
                    }>
                        {author.name}
                    </span>
                    {
                        session ? 
                        (
                            <FollowUser userId={author.id} style='btn-ghost btn-sm p-2 text-base-content/60 font-normal hover:text-dark'/>
                        )
                        :
                        (
                            <Link href='/sign-in' className='btn btn-ghost btn-sm p-2 text-base-content/60 font-normal hover:text-dark'>
                                Follow
                            </Link>
                        )
                    }
                </div>
    </>
  )
}

export default PostAuthor