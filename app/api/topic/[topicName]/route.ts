import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request,
  {params}:{params:{topicName:string}}) {
  const url = new URL(req.url)

  try {
    const { limit, page } = z
      .object({
        limit: z.string(),
        page: z.string(),
      })
      .parse({
        limit: url.searchParams.get('limit'),
        page: url.searchParams.get('page'),
      })

      const postsOfTopic = await db.tag.findFirst({
        where:{
            name: params.topicName
        },
        include:{
            posts:{
                take: parseInt(limit),
                skip: (parseInt(page) - 1) * parseInt(limit),
                orderBy:{
                    createdAt: 'desc'
                },
                include:{
                    author: true
                }
            }
        }
      })

      if(!postsOfTopic){
        return new Response('Topic does not exist');
      }

      if(postsOfTopic.posts.length === 0){
        return new Response('No posts found for this topic');
      }

    return new Response(JSON.stringify(postsOfTopic.posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
