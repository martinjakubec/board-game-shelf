import prisma from "@/utils/db/prismaClient"
import { compare } from "bcrypt"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  theme: {
    colorScheme: "light",
    logo: "/favicon.ico",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // const username = credentials?.username
        // const password = credentials?.password
        return {
          id: 2,
          name: "abc",
          email: "meh",
          username: "abc",
          bggUsername: "abcc",
        } as any

        // if (username && password) {
        //   const user = await prisma.user.findFirst({
        //     where: {
        //       username,
        //     },
        //   })
        //   if (user && (await compare(password, user.password))) {
        //     const userObject = {
        //       username: user.username,
        //       bggUsername: user.bggUsername,
        //     }
        //     console.log('correct password and stuff', userObject);
        //     return userObject as any
        //   }
        //   return null
        // }
        return null
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      console.log("in session")
      console.log("token", token)

      session.user.username = token.username as string
      session.user.bggUsername = token.bggUsername as string

      return session
    },
    jwt({ account, token, user, profile, session, trigger }) {
      console.log("in token")
      console.log("token", token)
      console.log("user", user)
      console.log("trigger", trigger)
      
      return trigger == "signIn"
        ? {
            username: user?.username,
            bggUsername: user?.bggUsername,
          }
        : {
            username: token.username,
            bggUsername: token.bggUsername,
          }
    },
  },
})

export { handler as GET, handler as POST }
