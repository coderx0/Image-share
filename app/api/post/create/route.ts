import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { PostValidator } from '@/lib/validators/post'
import { NextResponse } from 'next/server'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { title, imageUrl,tags } = PostValidator.parse(body)

    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const updatedTags = [];

    for (const tag of tags!) {
      try{
        const existingTag = await db.tag.findUnique({
          where:{
            id: tag.value
          }
        })
      
        if(!existingTag){
          const {id,name} = await db.tag.create({
            data:{
              name: tag.label
            }
          });

          updatedTags.push({value: id, label: name})
        }
        else{
          updatedTags.push(tag)
        }
      }
      catch(error){
        return new Response(
          'error creating tag',
          { status: 500 }
        )
      }
    }

    const newPost = await db.post.create({
      data: {
        title,
        imageUrl,
        authorId: session.user.id,
        tags: {
          connect: updatedTags?.map(tag=>({id: tag.value}))
        }
      },
    })

    return NextResponse.json({postId: newPost.id})
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
