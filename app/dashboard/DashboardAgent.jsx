import Link from 'next/link'
import React from 'react'
import Button from '../components/Button'
import './dashboard.css'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../lib/auth'

const data = async (id) => {
  const res = await fetch('http://localhost:3000/api/profile', { method: 'POST', body: JSON.stringify({ id }) })
  return res.json()
}
async function DashboardAgent (prop) {
  const session = await getServerSession(authOptions)
  const agentData = await data(session.user._id)

  return (
    <div id="wrapper" className="d-flex flex-column w-100">
        <div className='w-100 bg-white h-100'>
            <div className="container-fluid p-md-5 h-100">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Tablero Agente: {prop.user}</h1>

                </div>
                <div className='row gap-4 m-0 h-50 w-100 p-4 '>
                  <div className='row justify-content-between bg-light col-7 col-sm-5 col-md-3 m-0 p-2 rounded shadow'>
                    <div className='col-12'><h3 className=' text-blue fs-5'>Whatsapp</h3>
                    <span>Estado:{agentData.profile.whatsapp ? ' Conectado' : ' No conectado'}</span></div>
                    <Link className='col-12 row align-items-center m-auto' href={'/dashboard/account/whatsapp/chat'}><Button className='rounded p-2'>ir al chat</Button></Link>
                  </div>
                  <div className='row justify-content-between bg-light col-7 col-sm-5 col-md-3 m-0 p-2 rounded shadow'>
                    <div className='col-12'><h3 className=' text-blue fs-5'>Instagram</h3>
                    <span>Estado:{agentData.profile.instagram ? ' Conectado' : ' No conectado'}</span></div>
                    <Link className='col-12 row align-items-center m-auto' href={'/dashboard/account/instagram/chat'}><Button className='rounded p-2'>ir al chat</Button></Link>
                  </div>
                  <div className='row justify-content-between bg-light col-7 col-sm-5 col-md-3 m-0 p-2 rounded shadow'>
                    <div className='col-12 '><h3 className='text-blue fs-5'>Messenger</h3>
                    <span>Estado:{agentData.profile.messenger ? ' Conectado' : ' No conectado'}</span></div>
                    <Link className='col-12 row align-items-center m-auto' href={'/dashboard/account/messenger/chat'}><Button className='rounded p-2'>ir al chat</Button></Link>
                  </div>
                </div>
            </div>

        </div>

     </div>
  )
}

export default DashboardAgent
