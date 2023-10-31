import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: Request) {

  try {
    const session = await getAuthSession();
    if (!session){
      return new Response('Not authorized',{status: 401})
    }
    const userFollowings = await db.follow.findMany({
        where:{
            followerId: session.user.id
        }
    })
    
    return new Response(JSON.stringify({userFollowings}))
  } catch (error) {
    return new Response('Could not fetch posuser likes', { status: 500 })
  }
}
