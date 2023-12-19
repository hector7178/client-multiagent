import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../lib/auth'
import Signin from './signin'
import { redirect } from 'next/navigation'

export default async function Page () {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('https://client-multiagent-091c69d69e79.herokuapp.com/dashboard')
  } else {
    return (<Signin></Signin>)
  }
}
