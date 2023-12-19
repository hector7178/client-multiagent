import React from 'react'
import './agent.css'
import Link from 'next/link'
import Button from '../../components/Button'
import AgentList from './AgentList'
function agent () {
  return (
    <main className='d-flex flex-column bg-white w-100 main'>
        <div className="row">

            <div className="col-xl-7 col-lg-6">
                <div className="card shadow mb-4">

                    <div
                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold">LISTA DE AGENTES</h6>
                        <div className="dropdown no-arrow">
                            <Link className="" href="https://client-multiagent-091c69d69e79.herokuapp.com/dashboard/agent">
                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                            </Link>

                        </div>
                    </div>

                    <div className="card-body overflow-y-scroll p-4 gap-2 d-flex flex-column" style={{ height: '50vh' }}>
                          <AgentList/>
                    </div>
                </div>
            </div>

            <div className="col-xl-5 col-lg-6 row">
              <div className='d-flex flex-column gap-4'>
                <h5 className='p-0'>Registrar nuevo agente</h5>
                <Link href={'https://client-multiagent-091c69d69e79.herokuapp.com/dashboard/agent/new'} className='text-white' style={{ width: 'fit-content' }}><Button className='rounded p-2 '>Registrar</Button></Link>
              </div>

            </div>
        </div>
    </main>
  )
}

export default agent
