import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db';
import { ProfileImageValidator } from '@/lib/validators/profile'
import { NextResponse } from 'next/server'
import { z } from 'zod'

function isValidImageUrl(url:string) {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    
    const isURLValid = urlPattern.test(url);
      
      if(!isURLValid){
      return false;
      }
      
      const prefix = "https://utfs.io/f/";
    
    const startsWithPrefix = url.startsWith(prefix);
      
      if(!startsWithPrefix){
      return false;
      }
    
      return true;
  }
  

export async function POST(req: Request) {
  try {
      
    const session = await getAuthSession()
    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }
        
    const body = await req.json()
    const { imageUrl } = ProfileImageValidator.parse(body);
    if(!isValidImageUrl(imageUrl)){
        return new Response('Invalid Image url',{status:400})
    }

    await db.user.update({
        where:{
            id: session.user.id
        },
        data:{
            image: imageUrl
        }
    })

    return new Response("Profile Image updated successfully",{status:200})
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not update this time. Please try later',
      { status: 500 }
    )
  }
}
