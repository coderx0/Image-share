"use client"

import { PostCollectRequest } from '@/lib/validators/collectPost'
import { Collection, Post } from '@prisma/client'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { CheckCircle, Plus, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface Props {
    id: string,
    title: string,
    isPublic: boolean,
    creatorId: string,
    posts: Post[]
}

type CollectType = {
    collectType: 'COLLECT' | 'UNCOLLECT',
}

const AddToCollection = ({collection,postId}:{collection: Props,postId: string}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const [collected, setCollected] = useState<boolean>(false);

    useEffect(()=>{
      if(session?.user.id){
        const isCollected = !!collection.posts.find(post=>(post.id === postId));
        setCollected(isCollected)
      }
    },[collection.posts,session?.user.id])

    const { mutate: collectPost } = useMutation({
        mutationFn: async ({
          collectType,
        }: CollectType) => {
          const payload: PostCollectRequest = { collectType,postId,collectionId: collection.id }
          const { data } = await axios.post('/api/post/collect', payload)
          return data
        },
        onError: () => {
          return toast.error('Something Went Wrong',{
            description: 'Please try again.',
            duration: 4000
          })
        },
        onSuccess: () => {
          // const newPathname = pathname.split('/').slice(0, -1).join('/')
          // router.push(newPathname)

          console.log('ok')
    
          // router.refresh()
    
        //   return toast.success('Success',{
        //     description: 'Your post has been published.',
        //   })
        },
    })

    const collectHandler = ()=>{
        if(!session){
            router.push('/sign-in')
        }
        else if(collected){
            collectPost({collectType:'UNCOLLECT'})
            setCollected(false)
        }
        else{
            collectPost({collectType:'COLLECT'})
            setCollected(true)
        }
      }

  return (
    <button 
    onClick={collectHandler}
    className={`flex flex-col items-center gap-2`}>
        <span className={`btn w-[100px] h-[100px] rounded-lg ${collected && 'group btn-success hover:btn-error'}`}>
            {
                collected? <span>
                    <CheckCircle className='group-hover:hidden'/>
                    <X className='hidden group-hover:block'/>
                </span>:<Plus/>
            }
        </span>
        <span className='text-sm'>{collection.title}</span>
    </button>
  )
}

export default AddToCollection