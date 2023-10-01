export * from "next-auth"

declare module "next-auth" {
  interface User {
    username: string
  }

  interface Session extends DefaultSession {
    user: User
  }
}

import { JWT } from "next-auth/jwt"

declare module "next-auth/jwt" {
  interface JWT {
    username: string
  }

  interface DefaultJWT extends JWT {}
}
