import { db } from '@/lib/db'
import { z } from 'zod'

export async function GET(req: Request,
{params}:{params:{searchParam:string}}
    ) {
  try {
    const tags = await db.tag.findMany({
        where:{
            name:{
                startsWith: params.searchParam
            }
        },
    })

    return new Response(JSON.stringify(tags))
  } catch (error) {
    return new Response('Could not fetch tags', { status: 500 })
  }
}
