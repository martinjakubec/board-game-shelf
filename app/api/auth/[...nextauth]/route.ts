import prisma from "@/utils/db/prismaClient"
import { compare } from "bcrypt"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  theme: {
    colorScheme: "light",
    logo: "/favicon.ico",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const username = credentials?.username
          const password = credentials?.password

          if (username && password) {
            const user = await prisma.user.findFirst({
              where: {
                username,
                deletedAt: null,
              },
            })
            if (user && (await compare(password, user.password))) {
              const userObject = {
                username: user.username,
                bggUsername: user.bggUsername,
              }
              return userObject as any
            }
            return null
          }
          return null
        } catch (err) {
          console.error(err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    session({ session, token, user }) {
      session.user.username = token.username as string

      return session
    },
    jwt({ token, user, trigger }) {
      return trigger == "signIn"
        ? {
            username: user?.username,
          }
        : {
            username: token.username,
          }
    },
  },
})

export { handler as GET, handler as POST }
