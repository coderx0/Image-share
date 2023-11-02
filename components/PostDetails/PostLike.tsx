"use client"

import React, { useCallback, useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { PostLikeRequest } from '@/lib/validators/like'

interface Props{
    postId: string,
    style: string,
    showText?: boolean
}

type LikeType = {
    likeType: 'LIKE' | 'UNLIKE',
}

const PostLike = ({postId,style,showText=false}: Props) => {
    const {data: session} = useSession();
    const [liked, setLiked] = useState<boolean>(false);
    const router = useRouter();

    const fetchUserLikes = useCallback(async ()=>{
      try{
          const response = await axios.get('/api/post/userLikes')
          return response.data;
      }
      catch(err){
          toast.error("Unable to fetch Likes")
      }
  },[session?.user.id]);

  const {data, isLoading,refetch} = useQuery(['user_likes'],fetchUserLikes)
  

  useEffect(()=>{
    if(session?.user.id && data){
      const isLiked = !!data?.userLikes.find((like: any)=>(like.postId === postId && like.userId === session?.user.id));
      setLiked(isLiked)
    }
  },[data,session?.user.id])

    const { mutate: likePost } = useMutation({
        mutationFn: async ({
          likeType,
        }: LikeType) => {
          const payload: PostLikeRequest = { likeType,postId }
          const { data } = await axios.post('/api/post/like', payload)
          return data
        },
        onError: () => {
          return toast.error('Something Went Wrong',{
            description: 'Your post was not published. Please try again.',
            duration: 4000
          })
        },
        onSuccess: () => {
          refetch()
          // const newPathname = pathname.split('/').slice(0, -1).join('/')
          // router.push(newPathname)

    
          // router.refresh()
    
        //   return toast.success('Success',{
        //     description: 'Your post has been published.',
        //   })
        },
      })

      const likeHandler = ()=>{
        if(!session){
            router.push('/sign-in')
        }
        else if(liked){
            likePost({likeType:'UNLIKE'})
            setLiked(false)
        }
        else{
            likePost({likeType:'LIKE'})
            setLiked(true)
        }
      }

  return (
    <button className={`bg-base-200 flex justify-center items-center rounded-md hover:bg-primary hover:text-primary-800 ${style}`} onClick={likeHandler}>
        {
            liked? <Heart fill='pink' stroke='pink'/>:<Heart/>
        }
        {
          showText? <span>
            {
              liked? 'Unlike':'Like'
            }
          </span>:null
        }
    </button>
  )
}

export default PostLike