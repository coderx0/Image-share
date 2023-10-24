import EditProfile from '@/components/EditProfile';
import { getAuthSession } from '@/lib/auth'
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

  return (
    <EditProfile/>
  )
}

export default EditProfilePage