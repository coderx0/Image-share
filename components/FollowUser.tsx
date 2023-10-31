"use client"

import { UserFollowRequest } from '@/lib/validators/follow'
import { Follow } from '@prisma/client'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    userId: string,
    style: string
}

type FollowType = {
    followType: 'FOLLOW' | 'UNFOLLOW',
}


const FollowUser = ({userId, style}: Props) => {
    const {data: session} = useSession();
    const [followed, setFollowed] = useState<boolean>(false);
    const router = useRouter();

    const fetchUserFollowing = useCallback(async ()=>{
      try{
          const response = await axios.get('/api/user/followings')
          return response.data.userFollowings;
      }
      catch(err){
          toast.error("Unable to fetch Likes")
      }
  },[session?.user.id]);

  
  const {data,isLoading,refetch} = useQuery(['user_following'],fetchUserFollowing)

    useEffect(()=>{
      if(session?.user.id && data){
        const isFollowed = !!data.find((follower:any)=>(follower.followerId === session.user.id));
        setFollowed(isFollowed)
      }
    },[data,session?.user.id])

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

          refetch();
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

      if(isLoading){
        return (
          <button className={`btn ${style} invisible`}>
          </button>
        );
      }
  return (
    <button className={`btn ${style} ${followed && 'btn-primary'} `} onClick={followHandler}>
        {
            followed? 'Following':'Follow'
        }
    </button>
  )
}

export default FollowUser