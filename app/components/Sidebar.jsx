'use client'
import React, { useState } from 'react'
import { UserSvg } from './svgIcons/UserSvg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import WhatsappIcon from './svgIcons/WhatsappIcon'
import InstagramIcon from './svgIcons/InstagramIcon'
import MessengerIcon from './svgIcons/MessengerIcon'
import AccountDashIcon from './svgIcons/AccountDashIcon'
import DashboardIcon from './svgIcons/DashboardIcon'
import AgentsIcon from './svgIcons/AgentsIcon'
import ArrowIcon from './svgIcons/ArrowIcon'
import XIcon from './svgIcons/XIcon'
import ManuIcon from './svgIcons/ManuIcon'
import { signOut, useSession } from 'next-auth/react'

function Sidebar () {
  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)
  const path = usePathname()
  const onClick = () => {
    setActive(!active)
  }
  const { data: session } = useSession()
  return (
    <>
    <ul className=" navbar-nav sidebar-dark  h-100 col-3 d-none d-lg-flex flex-column gap-4 parentList">
            <li >
                <div className={path === '/dashboard' ? 'selected rounded' : 'text-white'}>

                    <Link className={path === '/dashboard' ? 'selected rounded' : 'text-white'} href={'/dashboard'}><DashboardIcon className='icons' /><span>Inicio</span></Link>
                </div>
            </li>
            <li >
                <div className={path === '/dashboard/profile' ? 'selected rounded' : 'text-white' }>

                    <Link className={path === '/dashboard/profile' ? 'selected' : 'text-white'} href={'/dashboard/profile'}><UserSvg className='icons' /><span>Perfíl</span></Link>
                </div>
            </li>
            <li className={'text-white d-flex flex-column gap-4'}>
                    <div className={path.includes('/dashboard/account') ? 'selected rounded d-flex flex-row' : 'text-white d-flex flex-row '}>
                        <AccountDashIcon className='icons' /> <span className='list d-flex flex-row justify-content-between w-100' onClick={onClick}>Cuentas <ArrowIcon className={`${active ? 'rotateIcon' : ''} icons `}/></span>
                    </div>
                    <ul className={active ? 'open' : '' + ' list gap-4 row row-column'}>
                        <li className={path.includes('/dashboard/account/whatsapp') ? 'selected rounded' : 'text-white ' }>
                        <Link className={ 'text-white d-flex flex-row gap-2'} href={'/dashboard/account/whatsapp'}>
                            <WhatsappIcon className='icons' />
                            <span className='d-none d-md-flex bg-transparent'>Whatsapp</span>
                        </Link>
                        </li>
                        <li className={path.includes('/dashboard/account/instagram') ? 'selected rounded' : 'text-white ' }>
                        <Link className={ 'text-white d-flex flex-row gap-2'} href={'/dashboard/account/instagram'}>
                            <InstagramIcon className='icons' />
                            <span className='d-none d-md-flex bg-transparent'>Instagram</span>
                        </Link>
                        </li>
                        <li className={path.includes('/dashboard/account/messenger') ? 'selected rounded' : 'text-white ' }>
                        <Link className={ 'text-white d-flex flex-row gap-2'} href={'/dashboard/account/messenger'}>
                            <MessengerIcon className='icons' />
                            <span className='d-none d-md-flex bg-transparent'>Messenger</span>
                        </Link>
                        </li>
                    </ul>
            </li>
            {session?.user?.rol === 'company'
              ? <li >
                <div className={path.includes('/dashboard/agent') ? 'selected rounded' : 'text-white' }>

                    <Link className={path.includes('/dashboard/agent') ? 'selected d-flex flex-row' : 'text-white d-flex flex-row' } href={'/dashboard/agent'}><AgentsIcon className='icons' /><span className='d-none d-md-flex bg-transparent'>Agentes</span></Link>
                </div>
            </li>
              : null
            }
            <Link href='#' onClick={() => signOut()} className='text-white d-flex flex-row gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>

                <span className='d-none d-md-flex'>Cerrar sesión</span>
            </Link>
    </ul>
    <ManuIcon className='position-absolute z-2 top-0 start-0 icons m-4 d-lg-none' onClick={() => setOpen(!open)}/>
    <ul className={`${open ? 'd-flex' : 'd-none'} navbar-nav sidebar-dark  h-100 col-8 col-sm-6  d-lg-none position-absolute z-3 start-0 top-0  flex-column gap-4 parentList`}>
            <XIcon className='icons' onClick={() => setOpen(!open)}/>
            <li >
                <div className={path === '/dashboard' ? 'selected rounded' : 'text-white'}>

                    <Link className={'text-white d-flex flex-row gap-2'} href={'/dashboard'}><DashboardIcon className='icons' /><span>Inicio</span></Link>
                </div>
            </li>
            <li >
                <div className={path === '/dashboard/profile' ? 'selected rounded' : 'text-white' }>

                    <Link className={'text-white d-flex flex-row gap-2'} href={'/dashboard/profile'}><UserSvg className='icons' /><span>Perfil</span></Link>
                </div>
            </li>
            <li className={'text-white d-flex flex-column gap-4'}>
                    <div className={path.includes('/dashboard/account') ? 'selected rounded d-flex flex-row gap-2' : 'text-white d-flex flex-row  gap-2'}>
                        <AccountDashIcon className='icons' /> <span className='list d-flex flex-row justify-content-between w-100' onClick={onClick}>Cuentas <ArrowIcon className={`${active ? 'rotateIcon' : ''} icons `}/></span>
                    </div>
                    <ul className={active ? 'open' : '' + ' list gap-4 row row-column'}>
                        <li className={path.includes('/dashboard/account/whatsapp') ? 'selected rounded' : 'text-white ' }>
                        <Link className={ 'text-white d-flex flex-row gap-2'} href={'/dashboard/account/whatsapp'}>
                            <WhatsappIcon className='icons' />
                            <span className=''>Whatsapp</span>
                        </Link>
                        </li>
                        <li className={path.includes('/dashboard/account/instagram') ? 'selected rounded' : 'text-white ' }>
                        <Link className={ 'text-white d-flex flex-row gap-2'} href={'/dashboard/account/instagram'}>
                            <InstagramIcon className='icons' />
                            <span className=''>Instagram</span>
                        </Link>
                        </li>
                        <li className={path.includes('/dashboard/account/messenger') ? 'selected rounded' : 'text-white ' }>
                        <Link className={ 'text-white d-flex flex-row gap-2'} href={'/dashboard/account/messenger'}>
                            <MessengerIcon className='icons' />
                            <span className=''>Messenger</span>
                        </Link>
                        </li>
                    </ul>
            </li>
            <li >
                <div className={path.includes('/dashboard/agent') ? 'selected rounded' : 'text-white' }>

                    <Link className={path.includes('/dashboard/agent') ? 'selected d-flex flex-row gap-2 gap-2' : 'text-white d-flex flex-row gap-2 gap-2' } href={'/dashboard/agent'}>
                        <AgentsIcon className='icons' />
                        <span className=''>Agentes</span>
                    </Link>
                </div>
            </li>
            <Link href='#' onClick={() => signOut()} className='text-white d-flex flex-row gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="icons">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>

                <span className=''>Cerrar sesión</span>
            </Link>
    </ul>

    </>
  )
}

export default Sidebar
