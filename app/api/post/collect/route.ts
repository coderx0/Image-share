import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'
import { PostCollectValidator } from '@/lib/validators/collectPost'
import { z } from 'zod'

export async function POST(req: Request) {
  const body = await req.json()

  const { postId, collectType,collectionId } = PostCollectValidator.parse(body)

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
    const existingCollection = await db.collection.findUnique({
      where:{
        id: collectionId
      },
      include:{
        posts:{
            where:{
                id: postId
            }
        }
      }
    });

    if(!existingCollection){
        return new Response('Collection not found', { status: 404 });
    }

    if(collectType === 'COLLECT'){
        if(existingCollection.posts.length === 0){
            await db.collection.update({
                where:{
                    id: collectionId
                },
                data:{
                    posts:{
                        connect :{
                            id: postId
                        }
                    }
                }
            })

            return new Response('Post successfully added to the collection', { status:200})
        }
        else{
            return new Response("Already collected")
        }
    }
    else{
        if(existingCollection.posts.length === 0){
            return new Response("Already does not exist in collection");
        }
        else{
            await db.collection.update({
                where:{
                    id: collectionId
                },
                data:{
                    posts:{
                        disconnect: {
                            id: postId
                        }
                    }
                }
            })

            return new Response("Post removed from collection")
        }
    }

  }
  catch (error) {
    (error)
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      `Could not ${collectType} at this time. Please try later`,
      { status: 500 }
    )
  }

}
