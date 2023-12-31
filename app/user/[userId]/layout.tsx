import FollowUser from '@/components/FollowUser';
import UserContentSelector from '@/components/UserContentSelector';
import { db } from '@/lib/db';
import { transformCloudinaryURL } from '@/lib/transformCloudinaryURL';
import { User } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props{
    children: React.ReactNode,
    params:{
        userId: string
    }
}

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'


const layout = async ({children,params}:Props) => {

    const userDetails = await db.user.findFirst({
        where:{
            id: params.userId
        },
        include:{
            followers: true,
            following: true
        }
    })

    const session = await getServerSession();

    if(!userDetails)
    {
        return notFound()
    }

    const postCount = await db.post.count({
        where:{
            authorId: userDetails.id
        }
    })
  return (
    <div className='flex flex-col'>
        <div className='flex flex-col items-center gap-4 justify-center pt-16'>
            {
                userDetails.image?.includes('cloudinary')?(
                    <div className='h-28 w-28'>
                        <img src={transformCloudinaryURL(userDetails.image) || ''} className='object-cover rounded-full'/>
                    </div>
                )
                :
                (
                    <User className='h-16 w-16 border-2 border-gray-500 rounded-full'/>
                )
            }
            <h4 className='text-3xl font-semibold'>
                {userDetails.name}
            </h4>

            {
                !session ? (
                    <Link href='/sign-in' className='btn '>Follow</Link>
                ):
                (
                    session.user.email === userDetails.email ?
                    (
                        <Link href={`/user/edit-profile/${userDetails.id}`} className='btn btn-success rounded-full' prefetch>
                            Edit Profile
                        </Link>
                    )
                    :
                    (
                    <FollowUser userId={userDetails.id} style=''/>
                    )
                )
            }
            <div className='flex gap-4 items-center'>
                <div className='p-4 flex flex-col justify-center items-center px-8'>
                    <span className='font-semibold text-base-content/60'>Total Posts</span>
                    <span className='text-2xl font-semibold mt-3'>{postCount}</span>
                </div>
                <div className='border-1 border-dark h-12'/>
                <div className='p-4 flex flex-col justify-center items-center px-8'>
                    <span className='font-semibold text-base-content/60'>Likes Received</span>
                    <span className='text-2xl font-semibold mt-3'>0</span>
                </div>
            </div>
        </div>
        
        <UserContentSelector userId={userDetails.id}/>
        <div>
            {children}
        </div>
    </div>
  )
}

export default layout