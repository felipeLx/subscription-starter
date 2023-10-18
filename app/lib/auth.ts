
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import bcrypt from 'bcryptjs';
import { redirect } from "next/navigation";
  
// debug: process.env.NODE_ENV === "development",
export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials): Promise<any> {
            if(!credentials?.email || !credentials?.password) return null
            const { email, password } = credentials;
            const user = await prisma.user.findUnique({
              where: { email },
              select: { id: true, username: true, email: true, roles: { select: { name: true }}, password: { select: { hash: true } } },
            })
          
            if (!user || !user?.password) {
              return null
            }
          
            const hash = await bcrypt.hash(password, 10)
            const isValid = await bcrypt.compare(password, hash)
          
            if (!isValid) return null

            return {
              id: user.id,
              email: user.email,
              username: user.username,
              roles: user.roles[0].name,
            }
          }
        })
    ],
    callbacks: {
      async jwt({ token, user }) {
        let previewUser = await prisma.user.findUnique({
          where: { id: user.id },
        })

        if(previewUser) return redirect('/login')
          if (user) {
              return {
                  ...token,
                  sameSite: 'None',
                  secure: true,
                  roles: 'user',
                  username: user.username
          }
        }
          return token
      },
      async session ({ session, token }) {
        
        let newSession = {
          sameSite: 'None',
          secure: true,
          satisfies: ['none', 'same-origin'],
          maxAge: 24 * 60,
          updateAge: 24*60*60,
          ...session,
          user: {
            ...session.user,
            role: token.roles,
            username: token.username
          }
        }          
        console.log('newSession', newSession)
        return newSession 
      }
  }    
}
