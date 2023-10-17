import { db } from '@/lib/db'
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
        take: 4
      }
    },
  })


  return (
    <div className='p-4'>
        <h2 className='text-center text-2xl font-semibold mt-6'>
            Discover the best of ImageDash
        </h2>
        <div className='mt-8'>
            {
              postsByTopics.map(topic=>(
                <div className='mb-6' key={topic.id}>
                  <h3 className='text-xl font-semibold mb-6'>{topic.name}</h3>
                  <div className='flex gap-4 flex-wrap'>
                    {
                      topic.posts.map(post=>(
                        <div key={post.id} className='w-[350px] h-[350px]'>
                          <img src={post.imageUrl} className='object-cover w-full h-full'/>
                        </div>
                      ))
                    }
                    <Link href={`/topic/${topic.name}`}>
                    <div className='w-[350px] h-[350px] bg-base-200 rounded-lg flex justify-center items-center group cursor-pointer hover:bg-success-200 transition-background duration-100'>
                      <span className='text-3xl font-semibold group-hover:scale-110 transtion-transform duration-100'>Visit More</span>
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