import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request,
  {params}:{params:{userId:string}}) {
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


    const posts = await db.post.findMany({
      where:{
        authorId: params.userId
      },
      take: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
