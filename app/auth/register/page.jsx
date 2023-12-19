import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../lib/auth'
import Register from './register'
import { redirect } from 'next/navigation'

export default async function Page () {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('http://localhost:3000/dashboard')
  }
  return (<Register></Register>)
}
