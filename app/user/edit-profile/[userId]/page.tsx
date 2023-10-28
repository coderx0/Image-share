import EditProfile from '@/components/EditProfile';
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db';
import React from 'react'

const EditProfilePage = async ({params}:{
    params:{
        userId: string,
    }
}) => {
    const session  = await getAuthSession();
    
    if(!session || session.user.id !== params.userId){
        return (
            <div className='w-full h-72 flex'>
                <h1 className='m-auto text-4xl font-semibold'>
                    Not Authorized
                </h1>
            </div>
        )
    }

    const userDetails = await db.user.findFirst({
        where:{
            id: session.user.id
        }
    }) 
    
    if(!userDetails){
        return null;
    }

  return (
    <EditProfile 
        userId={params.userId} 
        userName={userDetails.name || ''}
        bio={userDetails.bio || ''}
    />
  )
}

export default EditProfilePage