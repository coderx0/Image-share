import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db';
import { ProfileDetailsValidator } from '@/lib/validators/profile'
import { NextResponse } from 'next/server';
import { z } from 'zod'


export async function POST(req: Request) {
  try {
      
    const session = await getAuthSession()
    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }
        
    const body = await req.json()
    const { userName,bio } = ProfileDetailsValidator.parse(body);
    

    const user = await db.user.update({
        where:{
            id: session.user.id
        },
        data:{
            username: userName,
            bio,
            name: userName
        }
    })

    return NextResponse.json({user})
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
