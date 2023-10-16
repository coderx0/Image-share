import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(req: Request) {

  try {
    const session = await getAuthSession();
    if (!session){
      return new Response('Not authorized',{status: 401})
    }
    const userCollections = await db.collection.findMany({
        where:{
            creatorId: session.user.id
        },
        include:{
          posts: true
        }
    })
    return new Response(JSON.stringify({userCollections}))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
