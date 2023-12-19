'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const NavbarComponent = (params) => {
  const path = usePathname()

  return (
    <header className={path.includes('/dashboard') ? 'd-none' : ''} style={{ width: '100%', height: '12vh' }}>
      <Navbar expand='lg' style={{ background: '#263238ff' }} data-bs-theme="dark" className='shadow h-100 w-100 position-relative '>
        <div className='justify-between grid-div w-100'>
            <Link className='px-3 d-flex align-items-center text-white' href="/">
                <Image src='/logo.svg' width={100} height={100} alt='logo' className='logo w-75 h-100'/>
            </Link>
            <Nav className="justify-content-end align-items-center w-100 d-none  d-lg-flex">
                    <Link className="text-decoration-none col-3 gap-2 align-items-center justify-content-center text-light-emphasis d-flex flex-row link" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="iconNav">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className='nav-route'>Inicio</span>
                    </Link>
                    <Link className="text-decoration-none col-3  gap-2 align-items-center justify-content-center text-light-emphasis d-flex flex-row link" href="/aboutus">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="iconNav">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>

                        <span className='nav-route'>Conócenos</span>
                    </Link>
                    <Link className="text-decoration-none col-3 gap-2 align-items-center justify-content-center text-light-emphasis d-flex flex-row link" href="/#faq">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="iconNav">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>

                        <span className='nav-route'>FAQ</span>
                    </Link>
                    <Link className="text-decoration-none col-3 gap-2 align-items-center justify-content-center text-light-emphasis d-flex flex-row link" href="/auth/signin">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" iconNav">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span className='nav-route'>Inicia sesión</span>
                    </Link>
            </Nav>
            <Navbar.Toggle aria-controls=" basic-navbar-nav" className='toggle'/>
            <Navbar.Collapse id=" basic-navbar-nav ">
              <Nav className=" col-6  p-4 gap-2 row d-lg-none position-absolute z-3 text-white w-50 top-100 rounded-bottom-1" style={{ background: '#263238ff', right: '3%' }}>
                   <Link className="text-decoration-none col gap-2 align-items-center justify-content-start text-light-emphasis d-flex flex-row link " href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="iconNav">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span className='nav-route'>Inicio</span>
                    </Link>
                    <Link className="text-decoration-none col gap-2 align-items-center justify-content-start text-light-emphasis d-flex flex-row link " href="/aboutus">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="iconNav">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                        </svg>

                        <span className='nav-route'>Conócenos</span>
                    </Link>
                    <Link className="text-decoration-none col gap-2 align-items-center justify-content-start text-light-emphasis d-flex flex-row link " href="/#faq">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="iconNav">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                        </svg>

                        <span className='nav-route'>FAQ</span>
                    </Link>
                    <Link className="text-decoration-none col gap-2 align-items-center justify-content-start text-light-emphasis d-flex flex-row link " href="/auth/signin">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" iconNav">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg>
                        <span className='nav-route'>Inicia sesión</span>
                    </Link>
              </Nav>
            </Navbar.Collapse>
        </div>
      </Navbar>
    </header>
  )
}
export default NavbarComponent
