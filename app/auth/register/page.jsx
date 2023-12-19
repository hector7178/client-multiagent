import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../lib/auth'
import Register from './register'
import { redirect } from 'next/navigation'

export default async function Page () {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('https://client-multiagent-091c69d69e79.herokuapp.com/dashboard')
  }
  return (<Register></Register>)
}
