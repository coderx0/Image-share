import { db } from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials"
import { verifyPassword } from '@/utils/password'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      // @ts-ignore
      async authorize(credentials :{
        email: string,
        password: string,
        casrfToken: string,
        callbackUrl: string,
        json: string
      }){

        if(!credentials.email){
          return new Response('No Email Provided.',{status:401})
        }

        if(!credentials.password){
          return new Response('No password provided.',{status:401})
        }

        const user = await db.user.findFirst({
          where:{
            email: credentials!.email
          }
        });

        if(!user){
          throw new Error("Invalid Email address. Please try again!")
        }
        
        const isValidPassword = await verifyPassword({password: credentials!.password,hashedPassword:user.password});

        if(!isValidPassword){
          throw new Error("Invalid Password. Please try again!")
        }

        return user;
      }  
    })
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }

      return session
    },

    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (!dbUser) {
        token.id = user!.id
        return token
      }

      if (!dbUser.username) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            username: nanoid(10),
          },
        })
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        username: dbUser.username,
      }
    },
    // redirect() {
    //   return '/'
    // },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
