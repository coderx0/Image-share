"use client"

import { UserFollowRequest } from '@/lib/validators/follow'
import { Follow } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    followers: Follow[],
    userId: string
}

type FollowType = {
    followType: 'FOLLOW' | 'UNFOLLOW',
}


const FollowUser = ({followers,userId}: Props) => {
    const {data: session} = useSession();

    const [followed, setFollowed] = useState<boolean>(false);
    const router = useRouter();

    useEffect(()=>{
      if(session?.user.id){
        const isFollowed = !!followers.find(follower=>(follower.followerId === session.user.id));
        setFollowed(isFollowed)
      }
    },[followers,session?.user.id])

    const { mutate: followUser } = useMutation({
        mutationFn: async ({
          followType,
        }: FollowType) => {
          const payload: UserFollowRequest = { followType,userId }
          const { data } = await axios.post('/api/user/follow', payload)
          return data
        },
        onError: () => {
          return toast.error('Something Went Wrong',{
            description: 'Your post was not published. Please try again.',
            duration: 4000
          })
        },
        onSuccess: () => {
          // const newPathname = pathname.split('/').slice(0, -1).join('/')
          // router.push(newPathname)

          console.log('OK')
    
          // router.refresh()
    
        //   return toast.success('Success',{
        //     description: 'Your post has been published.',
        //   })
        },
      })


    const followHandler = ()=>{
        if(!session){
            router.push('/sign-in')
        }
        else if(followed){
            followUser({followType:'UNFOLLOW'})
            setFollowed(false)
        }
        else{
            followUser({followType:'FOLLOW'})
            setFollowed(true)
        }
      }

  return (
    <button className={`btn rounded-md ${!followed && 'btn-primary'}`} onClick={followHandler}>
        {
            followed? 'Following':'Follow'
        }
    </button>
  )
}

export default FollowUser