"use client"

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const EditProfile = () => {
    const {data: session } = useSession();
   

  return (
    <div className='p-4 flex flex-col items-center'>
        <h3 className='text-3xl font-semibold mt-6'>
            Profile Settings 
        </h3>
        <div className='flex items-center gap-4 mt-8 bg-base-200 p-4 rounded-xl w-full md:w-[80%] max-w-[800px]'>
            <div className='h-24 w-24'>
                <img src={session?.user.image!} alt={session?.user.name!} className='h-full w-full object-cover rounded-full'/>
            </div>
            <button className='btn btn-primary'>
                Change Image
            </button>
        </div>
        <form className='mt-6 flex flex-col p-4 bg-base-200 rounded-xl w-full md:w-[80%] max-w-[800px]'>
            <div className='flex flex-col gap-2 w-full my-4'>
                <label>User name</label>
                <input
                    type='text'
                    placeholder='User name you want to use'
                    // {...register('title')}
                    className='input input-bordered border-primary rounded-md w-full'
                />
            </div>
            
            <div className='flex flex-col gap-2 w-full my-6'>
                <label>About You</label>
                <textarea rows={5} className="textarea textarea-bordered border-primary" placeholder="Bio">
                </textarea>
            </div>
            
            <div className='flex mt-12'>
                <button className='btn btn-primary m-auto w-36' type='submit'>
                    Save
                </button>
            </div>
        </form>
    </div>
  )
}

export default EditProfile