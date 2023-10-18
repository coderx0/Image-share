import PostFeed from '@/components/HomeFeed/PostFeed'
import { INITIAL_POST_NUMBER } from '@/lib/constants'
import { db } from '@/lib/db'
import React from 'react'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

interface Props{
    params:{
        topicName: string
    }
}

const TopicPage = async({
    params
}: Props) => {
    const topic = await db.tag.findFirst({
        where:{
            name: params.topicName
        },
        include:{
            posts:{
                include:{
                    author: true
                },
                take: INITIAL_POST_NUMBER
            }
        }
    })
    if(!topic){
        return (
            <div>
                Topic does not exist
            </div>
        )
    }
    if(topic.posts.length === 0){
        return (
            <div>
                No posts found for this topic
            </div>
        )
    }
  return (
    <div className='bg-base-100'>
        <h2 className='text-3xl text-center pt-8 font-semibold text-base-content'>{params.topicName}</h2>
        <PostFeed initialPosts={topic.posts} endpoint={`/topic/${topic.name}`} shouldFetchNext={topic.posts.length === INITIAL_POST_NUMBER}/>
    </div>
  )
}

export default TopicPage