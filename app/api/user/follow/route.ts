import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { UserFollowValidator } from '@/lib/validators/follow'
import { z } from 'zod'

export async function POST(req: Request) {
  const body = await req.json()

  const { userId, followType } = UserFollowValidator.parse(body)

  const session = await getAuthSession()

  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 })
  }

  const user = await db.user.findFirst({
    where:{
      id: userId
    }
  });

  if(!user){
    return new Response('User not found', { status: 404 })
  }

  try{
    const alreadyFollowed = await db.follow.findFirst({
      where:{
        followerId: session.user.id,
        followingId: userId
      }
    });

    if(followType === 'FOLLOW'){
      if(alreadyFollowed){
        return new Response("Already following");
      }
      else{
        await db.follow.create({
          data:{
            followerId: session.user.id,
            followingId: userId
          }
        })
        return new Response('OK')
      }
    }
    else{
      if(alreadyFollowed){
        await db.follow.delete({
          where:{
            followerId_followingId:{
                followerId: session.user.id,
                followingId: userId
            }
          }
        })
        return new Response('OK')
      }
      else{
        return new Response("Already not following")
      }
    }
  }
  catch (error) {
    (error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      `Could not ${followType} at this time. Please try later`,
      { status: 500 }
    )
  }

}
