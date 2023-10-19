import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { CollectionValidator } from '@/lib/validators/collection'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const session = await getAuthSession()
    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }
    
    const { title } = CollectionValidator.parse(body);

    // const alreadyExists = await db.collection.findUnique({
    //     where:{
    //         title
    //     }
    // })

    // if(alreadyExists){
    //     return new Error('Collection with title already exists');
    // }

    await db.collection.create({
        data:{
            title,
            creatorId: session.user.id
        }
    });

    // const userCollections = await db.collection.findMany({
    //     where:{
    //         creatorId: session.user.id
    //     },
    //     include:{
    //         posts: true
    //     }
    // })

    return new Response("Collection created successfully", { status:200})
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not post this time. Please try later',
      { status: 500 }
    )
  }
}
