import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request,
{params}:{params:{searchParam:string}}
    ) {
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

      const postOfTag = await db.tag.findFirst({
        where:{
          name:{
            startsWith: params.searchParam
          }
        },
        include:{
          posts:{
            include:{
              author: true
            },
            take: parseInt(limit),
            skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
            orderBy: {
              createdAt: 'desc',
            },
          },
        }
      })


    // const posts = await db.post.findMany({
    //     where:{
    //         title:{
    //             startsWith: params.searchParam
    //         }
    //     },
    //   take: parseInt(limit),
    //   skip: (parseInt(page) - 1) * parseInt(limit), // skip should start from 0 for page 1
    //   orderBy: {
    //     createdAt: 'desc',
    //   },
    //   include: {
    //     author: true,
    //   },
    // })

    if(!postOfTag){
      return new Response("No results found");
    }

    return new Response(JSON.stringify(postOfTag.posts))
  } catch (error) {
    return new Response('Could not fetch posts', { status: 500 })
  }
}
