import React from 'react'
import TrashIcon from '../../components/svgIcons/TrashIcon'
import EditIcon from '../../components/svgIcons/EditIcon'
import './agent.css'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'

async function getAgent (id) {
  const res = await fetch('http://localhost:3000/api/agents', { method: 'POST', body: JSON.stringify({ id }) })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

async function AgentList () {
  const session = await getServerSession(authOptions)
  const agent = await getAgent(session.user._id)

  return (
    <>
    {agent.userList.map((e, i) => {
      return (
      <div key={i} className='border border-secondary-subtle p-2 row rounded'>
      <div className='row col-8'>
          <span className='col-12 '>{e?.username}</span>
          <span className='col-12 '>{e?.email}</span>
      </div>
        <div className='d-flex flex-row col-4 gap-2 align-items-center'>
          <TrashIcon className='col-5 icons' delete={e?._id} style={{ fill: '#00ADB5' }}/>
          <Link href={`/dashboard/agent/edit?id=${e?._id}&username=${e?.username}&email=${e?.email}&company=${e?.company}`}><EditIcon className='col-5 icons' style={{ stroke: '#00ADB5' }}/></Link>
        </div>
      </div>)
    })}

</>
  )
}

export default AgentList
