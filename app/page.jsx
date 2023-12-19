import Image from 'next/image'
import './home.css'
import Link from 'next/link'
import Carousel from './components/carousel'
import Faq from './components/FAQ/Faq'

export default function Home () {
  const data = [{
    tittle: 'Messenger',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos consequu',
    image: 'messenger.svg'
  },
  {
    tittle: 'Whatsapp',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos consequu',
    image: 'whatsapp.svg'
  },
  {
    tittle: 'Instagram',
    text: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos consequu',
    image: 'instagram.svg'
  }
  ]

  return (
    <>
    <main style={{ backgroundImage: 'url(../page1.svg)', backgroundSize: 'cover' }} className="overflow-hidden position-relative" >
      <section className="row gap-4 first-home align-content-center " >
        <div className="col-12 col-sm-5 m-0 d-flex flex-column gap-4  position-relative z-2">
          <h1 className='text-white mt-5 w-100' style={{ textShadow: '0px 6px 3px #000' }}>
            La mejor CRM Para tu negocio
          </h1>
          <h3 className='w-100'>
          &quot;Maximiza tus ventas y potencia tu negocio&quot;
          </h3>
          <Link href={'/auth/signin'} className='button text-white rounded p-2'>Comienza ya!</Link>
        </div>
        <div className="col-12 col-sm-6 m-0 position-relative z-2 d-flex justify-content-end ">
          <Image src={'home.svg'} width={100} height={100} className="w-75 h-100" alt='image boost your business'/>
        </div>
      </section>
      <section className="row gap-2 home align-content-center " >
        <div className="col-12 p-5 d-flex flex-column gap-4 text position-relative z-2">
          <h1 className='text-white mt-5 w-100 text-center' style={{ textShadow: '0px 6px 3px #000' }}>
          Automatiza tus procesos
          </h1>
          <h3 className='w-100 text-center'>
          &quot;Administra tus redes sociales y potencia tu negocio&quot;
          </h3>
          </div>
        <div className="col-12 gap-4 row position-relative z-2 justify-content-center d-none d-md-flex">
          <div className='col card-home rounded row justify-content-center'>
            <h5 className=' text-white col-12 text-center'>Messenger</h5>
            <p className=' text-center text-white col-12' style={{ opacity: '0.8' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos consequu</p>
            <Image src={'messenger.svg'} width={80} height={80} className="col-12" alt='boost your business'/></div>
          <div className='col card-home rounded row justify-content-center'>
            <h5 className=' text-white col-12 text-center '>Whatsapp</h5>
            <p className=' text-center text-white col-12' style={{ opacity: '0.8' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos consequu</p>
            <Image src={'whatsapp.svg'} width={80} height={80} className="col-12" alt='boost your business'/></div>
          <div className='col card-home rounded row justify-content-center'>
            <h5 className=' text-white col-12 text-center'>Instagram</h5>
            <p className=' text-center text-white col-12' style={{ opacity: '0.8' }}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos consequu</p>
            <Image src={'instagram.svg'} width={80} height={80} className="col-12" alt='boost your business'/></div>
        </div>
        <Carousel data={data} className='d-flex d-md-none'/>
      </section>
      <section className=' flex-md-row-reverse row home p-4 justify-content-center' >
        <div className="col-12 col-md-6 p-5 d-flex flex-column gap-4 text position-relative z-2 align-items-center justify-content-center">
          <h4 className='text-blue mt-5 w-100' style={{ textShadow: '0px 6px 3px #000' }}>
            Todo en uno...
          </h4>
          <p className='w-100 text-center text-white'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pharetra lorem eu dolor rhoncus, at scelerisque ligula gravida. Sed porta id mi sit amet convallis. Etiam iaculis massa sit amet lacus blandit sodales. Nulla ultrices velit a diam placerat congue.
          </p>
          <Link href={'/auth/signin'} className='d-none d-md-flex button text-white rounded px-4 p-2'>Sign in</Link>
        </div>
        <div className="col-12 col-md-6 position-relative z-2 p-4  d-flex justify-content-center">
          <Image src={'home3.svg'} width={100} height={100} className="w-75 h-100" style={{ maxWidth: '400px', maxHeigh: '510px' }} alt='boost your business'/>
        </div>
      </section>
      <section id='faq' className='row home p-4 justify-content-center'>
        <h2 className='col-12 text-center' style={{ textShadow: '0px 6px 3px #000' }}>FAQ</h2>
        <div className="col position-relative z-2 justify-content-center align-items-center ">
          <Faq/>
        </div>
        <div className="col position-relative z-2 p-4 d-flex justify-content-center d-none d-md-flex">
          <Image src={'home2.svg'} width={100} height={100} className="w-75 h-100" alt='boost your business'/>
        </div>
      </section>
    </main>
    <footer className='row position-relative'>
      <div className='col-5 d-flex align-items-center'>
       <Image src='logo.svg' width={100} height={100} alt='logo' className='w-100 h-100 logo m-auto'></Image>
      </div>
      <div className='col-7 row m-0 align-content-center gap-2 '>
        <Link href={'/'} className='col-10 col-md-5 text-white  m-0'>Inicio</Link>
        <Link href={'/aboutus'} className='col-10 col-md-5 text-white m-0'>Conócenos</Link>
        <Link href={'/auth/signin'} className='col-10 col-md-5 text-white m-0'>Inicia Sesión</Link>
        <Link href={'/auth/register'} className='col-10 col-md-5 text-white m-0'>Regístrate</Link>
      </div>
    </footer>
    </>
  )
}
