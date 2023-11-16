import { db } from '@/lib/db'
import { redis } from '@/lib/redis'

export async function GET(req: Request,{params}:{params: {postId:string}}) {
  try {
      const post = await db.post.findFirst({
          where:{
              id: params.postId
            },
            select:{
                tags:{
                    select:{
                        name: true
                    }
                }
            }
        })

        if(!post){
            return new Response('Invalid post Id',{status:400});
        }

        const tagNames = post.tags.map(tag=>tag.name);

        const relatedPosts = await db.post.findMany({
            where:{
                id:{
                    not: params.postId
                },
                tags:{
                    some:{
                        name:{
                            in: tagNames
                        }
                    }
                }
            },
            include:{
                author:true
            },
            take: 12
        })
    
    return new Response(JSON.stringify({relatedPosts}))
  } catch (error) {
    return new Response('Could not fetch related posts', { status: 500 })
  }
}
