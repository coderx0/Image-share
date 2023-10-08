"use client"

import React, { useEffect, useState } from 'react'
import { Like } from '@prisma/client'
import { Heart } from 'lucide-react'
import { getAuthSession } from '@/lib/auth'
import { useSession } from 'next-auth/react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { PostLikeRequest } from '@/lib/validators/like'

interface Props{
    likes: Like[],
    postId: string
}

type LikeType = {
    likeType: 'LIKE' | 'UNLIKE',
}

const PostLike = ({likes,postId}: Props) => {
    const {data: session} = useSession();
    const [liked, setLiked] = useState<boolean>(false);
    const router = useRouter();

    useEffect(()=>{
      if(session?.user.id){
        const isLiked = !!likes.find(like=>(like.postId === postId && like.userId === session?.user.id));
        setLiked(isLiked)
      }
    },[likes,session?.user.id])


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
          // const newPathname = pathname.split('/').slice(0, -1).join('/')
          // router.push(newPathname)

          console.log('liked')
    
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
    <button className={`btn rounded-md ${liked && 'btn-primary'}`} onClick={likeHandler}>
        {
            liked? <Heart fill='green' stroke='green'/>:<Heart/>
        }
        <span>
            Likes
        </span>
        <span>
            {likes?.length}
        </span>
    </button>
  )
}

export default PostLike