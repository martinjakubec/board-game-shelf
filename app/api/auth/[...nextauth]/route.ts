import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  theme: {
    brandColor: '#555',
    colorScheme: "light",
    logo: "/favicon.ico"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // If no error and we have user data, return it
        if (credentials?.password == 'martin' && credentials.username == 'martin') {
          return { id: 1, name: 'J Smith', email: 'jsmith@example.com' } as any
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
  ],
})

export { handler as GET, handler as POST }
