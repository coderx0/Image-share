import { db } from '@/lib/db'
import { transformCloudinaryURL } from '@/lib/transformCloudinaryURL'
import { Image } from 'lucide-react'
import React from 'react'

const UserCollectionsPage = async({params} :{
  params:{
    userId: string
  }
}) => {
  const collections = await db.collection.findMany({
    where:{
      creatorId: params.userId,
    },
    include:{
      posts: {
        take: 3,
      },
      _count:{
        select:{
          posts: true
        }
      }
    },
  })


  if(collections.length === 0) {
    return (
      <div className='w-full h-36 flex justify-center items-center'>
        <h4>No Collections Exixts</h4>
      </div>
    )
  }
  return (
    <div className='p-8 w-full flex flex-row flex-wrap gap-10 justify-center'>
      {
        collections.map(collection=>{
          return (
            <div key={collection.id} className=' w-72 flex flex-col items-center gap-4'>
              {
                collection.posts.length !== 0 ?
                (
                  <div className='w-full rounded-xl flex gap-2'>
                    {collection.posts.map((post,idx)=>{
                        return (
                          <div key={post.id} className={`h-72 flex-1`}>
                            <img src={transformCloudinaryURL(post.imageUrl) || ''} alt={post.title} className='w-full h-full object-cover rounded-xl'/>
                          </div>
                        )
                    })}
                  </div>
                )
                :
                (
                  <div className='bg-accent w-full h-full rounded-xl p-4'></div>
                )
              }
              <p className='flex w-full justify-between'>
                <span>{collection.title}</span>
                <span className='flex gap-2 items-center'>
                  <Image/>
                  {collection._count.posts}</span>
              </p>
            </div>
          )
        })
      }
    </div>
  )
}

export default UserCollectionsPage