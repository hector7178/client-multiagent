import React from 'react'
import '../instagram.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth'
import { redirect } from 'next/navigation'
import Instagram from '../../../../models/Instagram'
import Chat from '../../../../components/Chat'
const datafetch = async (session) => {
  const resFetch = await fetch(`${process.env.NEXTAUTH_URL}/api/profile`, { method: 'POST', body: JSON.stringify({ id: session }) })
  const dataFetch = await resFetch.json()
  return dataFetch
}
const pathF = async (session) => {
  const resFetch = await Instagram.findOne({ company_id: session })
  if (resFetch) {
    return resFetch
  }
  return 'no encontrado'
}

async function page () {
  const session = await getServerSession(authOptions)
  const dataRes = await datafetch(session.user.rol === 'agent' ? session.user.id_company : session.user._id)
  const path = await pathF(session.user.rol === 'agent' ? session.user.id_company : session.user._id)

  if (!dataRes?.profile?.instagram) {
    redirect(`${process.env.NEXTAUTH_URL}/dashboard/account/instagram`)
  }
  return (
    <main className='d-flex flex-column bg-white w-100 p-4'>
      {session.user.rol === 'agent'
        ? <Chat id={session.user.id_company} type={'instagram'} path={path.webhook_path}/>
        : <Chat id={session.user._id} type={'instagram'} path={path.webhook_path}/>
      }
    </main>
  )
}

export default page
