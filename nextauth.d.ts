export * from "next-auth"

declare module "next-auth" {
  interface User {
    username: string;
    bggUsername: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}