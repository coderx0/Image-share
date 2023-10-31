import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request) {
  const url = new URL(req.url)

  try {

    const session = await getAuthSession();

      if(!session){
        return new Response("Unauthorized",{status: 401})
      }

    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

      const followingUsers = await db.follow.findMany({
        where:{
          followerId: session.user.id
        },
        include:{
          following: true
        }
      })

      const followingUsersIds = followingUsers.map(user=>user.followingId);

      const posts = await db.post.findMany({
        where:{
            authorId: {
                in: followingUsersIds
            }
        },
        include:{
          author: true
        },
        take: parseInt(limit),
        skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
        orderBy: {
          createdAt: 'desc',
        },
      })


    if(!posts){
      return new Response("No results found");
    }

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
