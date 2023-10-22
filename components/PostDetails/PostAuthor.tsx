import { User } from '@prisma/client'
import { UserIcon } from 'lucide-react'
import React from 'react'

const PostAuthor = ({author}: {author: User}) => {
  return (
    <>
        <div className="bg-red-100 w-12 h-12 flex justify-center items-center rounded-full">
                    {
                        author.image ? (<img src={author.image} className='rounded-full'/>):
                        (
                            <UserIcon className=''/>
                        )
                    }
                </div>
                <div className='flex flex-col items-start'>
                    {/* <Link href={`/user/${author.id}`} className='cursor-pointer'> */}
                    <span className='font-semibold text-lg pl-2 cursor-pointer' onClick={()=>
                        location.assign(`${process.env.NEXT_PUBLIC_CLIENT_URL}/user/${author.id}`)
                    }>
                        {author.name}
                    </span>
                    {/* </Link> */}
                    <button className='btn btn-ghost btn-sm p-2 text-base-content/60 font-normal hover:text-dark'>
                        Follow
                    </button>
                </div>
    </>
  )
}

export default PostAuthor