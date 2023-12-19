'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Carousel (params) {
  const [current, setCurrent] = useState(0)
  const carouselInfinite = () => {
    if (current === params.data.length - 1) {
      return setCurrent(0)
    } else {
      return setCurrent(current + 1)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => carouselInfinite(), 6500)
    return () => clearInterval(interval)
  })
  return (

<div className={' col-12 gap-4 row position-relative z-2 justify-content-center' + params.className}>
    {params.data.map((e, index) => {
      return <div key={index} className={`col card-home rounded ${index === current ? 'row carousel-home-animate' : 'd-none '} carousel-home justify-content-center`}>
    <h5 className=' text-white col-12 text-center'>{e.tittle}</h5>
    <p className='text-center text-white col-12' style={{ opacity: '0.7' }}>{e.text}</p>
    <Image src={e.image} width={80} height={80} className="col-12" alt='boost your business'/></div>
    })}

</div>
  )
};
