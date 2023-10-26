import { db } from '@/lib/db'
import { redis } from '@/lib/redis'

export async function GET(req: Request,{params}:{params: {postId:string}}) {
  try {

    let postDetails = await redis.hgetall(`postDetails_${params.postId}`)

    if(!postDetails){
      postDetails = await db.post.findFirst({
        where:{
          id: params.postId
        },
        include:{
          author: true,
        }
      })
      
      if(!postDetails){
        return new Response('Can not fetch',{status:400});
      }
    
    await redis.hset(`postDetails_${postDetails.id}`,postDetails);
    }
    
    return new Response(JSON.stringify({postDetails}))
  } catch (error) {
    return new Response('Could not fetch post details', { status: 500 })
  }
}
