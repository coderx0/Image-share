import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: Request) {

  try {
    const session = await getAuthSession();
    if (!session){
      return new Response('Not authorized',{status: 401})
    }
    const userLikes = await db.like.findMany({
        where:{
            userId: session.user.id
        }
    })
    
    console.log({userLikes});

    return new Response(JSON.stringify({userLikes}))
  } catch (error) {
    return new Response('Could not fetch posuser likes', { status: 500 })
  }
}
