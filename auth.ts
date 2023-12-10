import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { kv } from '@vercel/kv'
declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}
interface User {
  email: string
  password: string
  // Other user data if applicable
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'rdj@redlnk.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      // @ts-ignore
      async authorize(credentials: {
        email: any
        password: any
      }): Promise<{} | null> {
        console.log('logging in..')

        try {
          const user = await kv.get<User>(`user:${credentials?.email}`)
          if (!user) {
            return null
          }

          if (!user?.password) {
            return null
          }

          const passwordCorrect = await compare(
            credentials?.password,
            user.password
          )

          if (passwordCorrect) {
            return user
          }

          return null
        } catch (error) {
          return null
        }
      }
    })
  ],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url || profile.picture
      }
      return token
    },
    session: ({ session, token }) => {
      if (session?.user && token?.id) {
        session.user.id = String(token.id)
      }
      return session
    },
    authorized({ request, auth }) {
      return !!auth?.user
    }
  },
  pages: {
    signIn: '/sign-in'|| "/sign-up",
  }
})
