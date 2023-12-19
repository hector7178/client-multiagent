import './dashboard.css'
import Sidebar from '../components/Sidebar'

export default async function Layout ({ children }) {
  return (
<>
<div className='w-100 row m-0 d-lg-none' style={{ background: '#263238ff', height: '10vh' }}>
</div>
<div id="wrapper">

        <Sidebar/>
        {children}
</div>
</>
  )
}
