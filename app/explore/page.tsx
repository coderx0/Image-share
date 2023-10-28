import { db } from '@/lib/db'
import { transformCloudinaryURL } from '@/lib/transformCloudinaryURL'
import Link from 'next/link'
import React from 'react'

const ExplorePage = async () => {

  const postsByTopics = await db.tag.findMany({
    where:{
      posts:{
        some:{

        },
      },
    },
    orderBy:{
      createdAt: 'desc'
    },
    include:{
      posts: {
        take: 3
      }
    },
  })


  return (
    <div className='p-4 bg-base-100'>
        <h2 className='text-center text-2xl font-semibold mt-6 text-base-content'>
            Discover the best of ImageDash
        </h2>
        <div className='mt-8'>
            {
              postsByTopics.map(topic=>(
                <div className='my-12' key={topic.id}>
                  <h3 className='text-xl font-semibold mb-6 text-base-content'>{topic.name}</h3>
                  <div className='flex gap-4 flex-wrap'>
                    {
                      topic.posts.map(post=>(
                        <div key={post.id} className='w-[350px] h-[350px]'>
                          <img src={transformCloudinaryURL(post.imageUrl) || ''} className='object-cover w-full h-full'/>
                        </div>
                      ))
                    }
                    <Link href={`/topic/${topic.name}`} prefetch>
                    <div className='w-[350px] h-[350px] rounded-lg flex justify-center items-center group cursor-pointer bg-base-300 hover:bg-base-200 transition-background duration-100'>
                      <span className='text-3xl font-semibold group-hover:scale-110 transtion-transform duration-100 text-base-content'>Visit More</span>
                    </div>
                    </Link>
                  </div>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default ExplorePage