import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

// Mock user database
const users = [
  {
    id: "1",
    name: "John Donor",
    email: "donor@example.com",
    password: "password123",
    role: "donor",
  },
  {
    id: "2",
    name: "Jane Volunteer",
    email: "volunteer@example.com",
    password: "password123",
    role: "volunteer",
  },
  {
    id: "3",
    name: "Hope Foundation",
    email: "ngo@example.com",
    password: "password123",
    role: "ngo",
  },
]

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = users.find((user) => user.email === credentials.email)

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }

        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error", // Make sure this points to the correct page
    signOut: "/auth/signout",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-do-not-use-in-production",
  debug: process.env.NODE_ENV === "development",
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
