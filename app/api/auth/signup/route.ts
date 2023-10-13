import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { RegisterValidator } from "@/lib/validators/register";
import { z } from "zod";

export async function POST(req: Request) {
    try {
        const body = await req.json()
    
        const { username,password,email } = RegisterValidator.parse(body)

        const session = await getAuthSession()
        
        if (session) {
              return new Response('Already authorized', { status: 401 })
        }
        
        
        const userWithEmail = await db.user.findFirst({
            where: {
                email
            }
        })
        
        if(userWithEmail){
            return new Response("User with email already exists", { status:401})
        }
        
        const userWithUsername = await db.user.findFirst({
            where:{
                username,
            }
        })
        
        if(userWithUsername){
                return new Response("User with username already exists", { status:401})
        }
        
        await db.user.create({
            data:{
                username,
                email,
                password
            }
        })

        return new Response("Account created successfully", { status:200});
    
      } catch (error) {
        if (error instanceof z.ZodError) {
          return new Response(error.message, { status: 400 })
        }
    
        return new Response(
          'Could not register this time. Please try later',
          { status: 500 }
        )
      }
}

