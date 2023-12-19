import React from 'react'
import '../messenger.css'
import Chat from '../../../../components/Chat'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../../../../lib/auth'
import { redirect } from 'next/navigation'
import Messenger from '../../../../models/Messenger'

const datafetch = async (session) => {
  const resFetch = await fetch(`${process.env.NEXTAUTH_URL}/api/profile`, { method: 'POST', body: JSON.stringify({ id: session }) })
  const dataFetch = await resFetch.json()
  return dataFetch
}
const pathF = async (session) => {
  const resFetch = await Messenger.findOne({ company_id: session })
  if (resFetch) {
    return resFetch
  }
  return 'no encontrado'
}
async function page () {
  const session = await getServerSession(authOptions)
  const dataRes = await datafetch(session.user.rol === 'agent' ? session.user.id_company : session.user._id)
  const path = await pathF(session.user.rol === 'agent' ? session.user.id_company : session.user._id)
  if (!dataRes?.profile?.messenger) {
    redirect(`${process.env.NEXTAUTH_URL}/dashboard/account/messenger`)
  }
  return (
    <main className='d-flex flex-column bg-white w-100 p-4'>
        {session.user.rol === 'agent'
          ? <Chat id={session.user.id_company} type={'messenger'} path={path.webhook_path}/>
          : <Chat id={session.user._id} type={'messenger'} path={path.webhook_path}/>
      }
    </main>
  )
}

export default page
