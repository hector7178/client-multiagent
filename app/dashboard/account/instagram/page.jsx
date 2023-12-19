import './instagram.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../lib/auth'
import { redirect } from 'next/navigation'
import RegisterAccount from './RegisterAccount'

const datafetch = async (session) => {
  const resFetch = await fetch('https://client-multiagent-091c69d69e79.herokuapp.com/api/profile', { method: 'POST', body: JSON.stringify({ id: session.user._id }) })
  const dataFetch = await resFetch.json()
  return dataFetch
}
async function page () {
  const session = await getServerSession(authOptions)
  const dataRes = await datafetch(session)

  if (dataRes?.profile?.instagram) {
    redirect('https://client-multiagent-091c69d69e79.herokuapp.com/dashboard/account/instagram/chat')
  }
  return (
  <main className='d-flex flex-column bg-white w-100 parent gap-4 '>
     <RegisterAccount status={session.user.rol === 'company'}/>
  </main>
  )
}

export default page
