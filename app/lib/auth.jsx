import dbConnect from './dbconnect'
import Users from '../models/Users'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: '...'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        await dbConnect()

        const userFound = await Users.findOne({
          username: credentials?.username
        })

        if (!userFound) {
          return null
        }
        const mach = credentials.password === userFound.password
        if (!mach) {
          return null
        }
        return userFound
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt ({ token, user }) {
      if (user) token.user = user
      return token
    },
    async session ({ session, token }) {
      session.user = token.user

      return session
    }
  }

}
