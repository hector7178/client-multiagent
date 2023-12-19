import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Inter } from 'next/font/google'
import NavbarComponent from './components/Navbar'
import Providers from './provider'
import { StrictMode } from 'react'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MultiAgent',
  description: 'App open-source.'
}

export default function RootLayout ({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <StrictMode>
          <NavbarComponent/>
          {children}
          </StrictMode>
        </Providers>
      </body>
    </html>
  )
}
