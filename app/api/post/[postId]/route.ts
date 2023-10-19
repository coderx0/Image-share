import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: Request,{params}:{params: {postId:string}}) {
  try {
    const postDetails = await db.post.findFirst({
        where:{
            id: params.postId
        },
        include:{
            author: true,
            likes: true
        }
    })
    return new Response(JSON.stringify({postDetails}))
  } catch (error) {
    return new Response('Could not fetch post details', { status: 500 })
  }
}
