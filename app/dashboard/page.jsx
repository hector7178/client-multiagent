import Link from 'next/link'
import './dashboard.css'
import Button from '../components/Button'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../lib/auth'
import DashboardAgent from './DashboardAgent'

const agents = async (session) => {
  const res = await fetch('https://client-multiagent-091c69d69e79.herokuapp.com/api/agents', { method: 'POST', body: JSON.stringify({ id: session?.user?._id }) })
  return res.json()
}

export default async function Dashboard () {
  const session = await getServerSession(authOptions)
  if (session.user.rol === 'agent') {
    return <DashboardAgent user={session?.user?.username}/>
  }
  const agent = await agents(session)
  return (
    <div id="content-wrapper" className="d-flex flex-column">
        <div id="content p-5">
            <div className="container-fluid p-md-5">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                            <h1 className="h3 mb-0 text-gray-800">Tablero</h1>
                            <Button className='rounded p-2 custom-btn'><Link href="#" className="text-white"> Generar reporte</Link></Button>
                </div>
                <div className="row">
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <h6 className="text-xs font-weight-bold  text-uppercase mb-1">
                                                    Chats <br/> ( Mes )</h6>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-success shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <h6 className="text-xs font-weight-bold text-uppercase mb-1">
                                                    nuevos clientes<br/> ( mes )</h6>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-info shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <h6 className="text-xs font-weight-bold  text-uppercase mb-1">
                                                    Chats activos <br/>( Mes )
                                                </h6>
                                                <div className="row no-gutters align-items-center">
                                                    <div className="col-auto">
                                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">0</div>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-warning shadow h-100 py-2">
                                    <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                            <div className="col mr-2">
                                                <h6 className="text-xs font-weight-bold text-uppercase mb-1">
                                                    Peticiones pendientes</h6>
                                                <div className="h5 mb-0 font-weight-bold text-gray-800">0</div>
                                            </div>
                                            <div className="col-auto">
                                                <i className="fas fa-comments fa-2x text-gray-300"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </div>
                <div className="row">

                            <div className="col-xl-7 col-lg-6">
                                <div className="card shadow mb-4">

                                    <div
                                        className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold text-uppercase">lista de agentes</h6>
                                        <div className="dropdown no-arrow">
                                            <Link className="" href="/dashboard/agent">
                                                <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                            </Link>

                                        </div>
                                    </div>

                                    <div className="card-body overflow-y-scroll p-4 gap-2 d-flex flex-column" style={{ height: '50vh' }}>
                                              {agent.userList.map((e, i) => {
                                                return (
                                                <div key={i} className='border border-secondary-subtle p-2 row rounded'>
                                                <span className='col-12 '>{e.username}</span>
                                                <span className='col-12 '>{e.email}</span>
                                                </div>)
                                              })
                                              }

                                    </div>
                                </div>
                            </div>

                </div>

            </div>

        </div>

     </div>

  )
}
