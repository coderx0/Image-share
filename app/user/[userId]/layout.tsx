import FollowUser from '@/components/FollowUser';
import { db } from '@/lib/db';
import { user } from '@nextui-org/react';
import { User } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import React from 'react'

interface Props{
    children: React.ReactNode,
    params:{
        userId: string
    }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'


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
                userDetails.image?(
                    <div className='h-16 w-16'>
                        <img src={userDetails.image} className='object-cover'/>
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
                (session && session.user.email === userDetails.email) ?
                (
                    <button className='btn btn-success rounded-md'>
                        Edit Profile
                    </button>
                )
                :
                (
                    <FollowUser followers={userDetails.followers} userId={userDetails.id}/>
                )
            }
            <div className='flex gap-4 items-center'>
                <div className='p-4 flex flex-col justify-center items-center px-8'>
                    <span className='font-semibold text-gray-600'>Total Posts</span>
                    <span className='text-2xl font-semibold mt-3'>{postCount}</span>
                </div>
                <div className='border-1 border-dark h-12'/>
                <div className='p-4 flex flex-col justify-center items-center px-8'>
                    <span className='font-semibold text-gray-600'>Likes Received</span>
                    <span className='text-2xl font-semibold mt-3'>0</span>
                </div>
            </div>
        </div>
        <div className='px-12'>
            <button className='btn btn-ghost'>
                Gallery
            </button>
            <button className='btn btn-ghost'>
                Collections
            </button>
            <button className='btn btn-ghost'>
                Followers
            </button>
            <button className='btn btn-ghost'>
                Following
            </button>
        </div>
        <div>
            {children}
        </div>
    </div>
  )
}

export default layout