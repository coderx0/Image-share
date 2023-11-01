import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { redis } from '@/lib/redis'
import { PostLikeValidator } from '@/lib/validators/like'
import { z } from 'zod'

export async function POST(req: Request) {
  const body = await req.json()

  const { postId, likeType } = PostLikeValidator.parse(body)

  const session = await getAuthSession()

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const post = await db.post.findFirst({
    where:{
      id: postId
    }
  });

  if(!post){
    return new Response('Post not found', { status: 404 })
  }

  try{
    const likeExists = await db.like.findFirst({
      where:{
        userId: session.user.id,
        postId
      }
    });

    if(likeType === 'LIKE'){
      if(likeExists){
        return new Response("Already liked");
      }
      else{
        await db.like.create({
          data:{
            userId: session.user.id,
            postId
          }
        })

        const resp = await db.user.update({
          where:{
            id: post.authorId
          },
          data:{
            totalLikedReceived: {
              increment: 1
            }
          }
        })

        await redis.zadd('leaderboard',{score: resp.totalLikedReceived,member:resp.id});

        return new Response('OK')
      }
    }
    else{
      if(likeExists){
        await db.like.delete({
          where:{
            userId_postId :{
              userId: session.user.id,
              postId
            }
          }
        })
        const resp = await db.user.update({
          where:{
            id: post.authorId
          },
          data:{
            totalLikedReceived: {
              decrement: 1
            }
          }
        })

        await redis.zadd('leaderboard',{score: resp.totalLikedReceived,member:resp.id});

        return new Response('OK')
      }
      else{
        return new Response("Already Unliked")
      }
    }
  }
  catch (error) {
    (error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      `Could not ${likeType} at this time. Please try later`,
      { status: 500 }
    )
  }

}
