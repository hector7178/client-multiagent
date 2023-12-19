import React from 'react'
import './whatsapp.css'
import RegisterAccount from './RegisterAccount'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../lib/auth'
import { redirect } from 'next/navigation'

const datafetch = async (session) => {
  const resFetch = await fetch(`${process.env.NEXTAUTH_URL}/api/profile`, { method: 'POST', body: JSON.stringify({ id: session.user._id }) })
  const dataFetch = await resFetch.json()
  return dataFetch
}
async function page () {
  const session = await getServerSession(authOptions)
  const dataRes = await datafetch(session)

  if (dataRes?.profile?.whatsapp) {
    redirect('http://localhost:3000/dashboard/account/whatsapp/chat')
  }
  return (
    <main className='d-flex flex-column bg-white w-100 main gap-4 '>
        <RegisterAccount status={session.user.rol === 'company'}/>
    </main>
  )
}

export default page
