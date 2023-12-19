'use client'

import { useEffect, useRef, useState } from 'react'
import ArrowLeftIcon from './svgIcons/ArrowLeftIcon'

function Chat (prop) {
  const [msj, setMsj] = useState('')
  const [Chats, setChats] = useState([])
  const [chatSelected, setChatSelected] = useState('')
  const [infoMsj, setInfoMsj] = useState('')
  const focus = useRef()
  const focus2 = useRef()
  console.log(prop.path)

  useEffect(() => {
    const chatsfetch = async (id, type) => {
      const resFetch = await fetch('http://localhost:3000/api/chats', { method: 'POST', body: JSON.stringify({ id, type }) })
      const dataFetch = await resFetch.json()
      return dataFetch
    }
    setInterval(() => {
      chatsfetch(prop.id, prop.type).then(data => setChats(data.chats)).catch(err => console.error('error chats fetch', err))
    }, 5000)
  }, [])

  const sendEnter = async (e) => {
    if (e.key === 'Enter') {
      if (infoMsj !== '') {
        const resFetch = await fetch('http://localhost:3000/api/sendchats', { method: 'POST', body: JSON.stringify({ idSend: infoMsj, msj, element: prop.path }) })
        const dataFetch = await resFetch.json()
        setMsj('')
        return dataFetch
      }
    }
  }
  const send = async (e) => {
    if (infoMsj !== '') {
      const resFetch = await fetch('http://localhost:3000/api/sendchats', { method: 'POST', body: JSON.stringify({ idSend: infoMsj, msj, element: prop.path }) })
      const dataFetch = await resFetch.json()
      setMsj('')
      return dataFetch
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', sendEnter, false)
    focus.current?.scrollTo(0, focus.current.scrollHeight)
    focus2.current?.scrollTo(0, focus2.current.scrollHeight)
    return () => {
      document.removeEventListener('keydown', sendEnter, false)
    }
  })
  return (
    <section className='row h-100 w-100 m-0 rounded' style={{ background: ' #263238ff', padding: '3px' }}>
        <div className='d-md-flex d-none'>
          <div className='col-4 p-2 d-flex flex-column gap-4 m-0 overflow-scroll overflow-x-hidden scroll' style={{ background: '#263238ff', height: '86vh' }}>
              <h4 className="text-white p-2">Chat activos</h4>
              {Chats?.map((e, i) => {
                return (
              <div key={i} className={`col-12 p-2 flex flex-col bg-white rounded ${chatSelected === i ? 'opacity' : ''}`} onClick={() => { setChatSelected(i); setInfoMsj(e?.identy) }} style={{ cursor: 'pointer', minHeight: '15vh' }}>
                  <h5>{e?.chat[0]?.user}</h5>
                  <span>{e?.identy}</span>
              </div>)
              })}
          </div>
          <div className='col-8 p-2 bg-body-secondary row m-0' style={{ height: '86vh' }}>
              <div ref={focus} className="w-100 h-75 overflow-scroll overflow-x-hidden scroll flex flex-column gap-2">
              {Chats[chatSelected]?.chat?.map((data, i) => {
                return (<div key={i} className='col-12 d-grid'>
                    <div className={`${data?.id !== Chats[chatSelected].identy ? ' msj-send justify-self-end' : 'msj-recive'} shadow p-2 mt-2`}>
                        <p>{data.msj}</p>
                    </div>
                  </div>)
              })}
              </div>
              <div className="row m-0 w-100 h-25 align-items-center p-2">
                  <textarea onChange={(e) => setMsj(e.target.value)} value={msj} className="col-9 h-100 rounded "/>
                  <button className="col-3 p-2  m-auto buttonSend" onClick={() => send()}> Enviar</button>

              </div>
          </div>
        </div>
        <div className='d-md-none d-flex p-2 justify-content-center position-relative'>
          {chatSelected === ''
            ? <div className='col-10 col-sm-8 p-2 row m-0 gap-2   overflow-scroll overflow-x-hidden scroll' style={{ background: '#263238ff', height: '86vh' }}>
              <h4 className="text-white p-2">Chat activos</h4>
              {Chats?.map((e, i) => {
                return (
              <div key={i} className={`col-12 p-2 bg-white rounded ${chatSelected === i ? 'opacity' : ''}`} onClick={() => setChatSelected(i)} style={{ cursor: 'pointer' }}>
                  <h5>{e.chat.user}</h5>
                  <span>{e.identy}</span>
              </div>)
              })}
          </div>
            : <>
            <div className='position-absolute  w-100 p-2 top-0 barra' >
              <ArrowLeftIcon className='icons ' onClick={() => setChatSelected('')}/>
            </div>
            <div className='col-12 p-2 bg-body-secondary row m-0' style={{ height: '86vh' }}>
            <div ref={focus2} className="w-100 h-75 overflow-scroll overflow-x-hidden scroll flex flex-column gap-2">
            {Chats[chatSelected]?.chat?.map((data, i) => {
              return (<div key={i} className='col-12 d-grid'>
                  <div className={`${data?.chat?.user === 'Griman`s' ? ' msj-send justify-self-end' : 'msj-recive'} shadow p-2 mt-4`}>
                      <p>{data?.msj}</p>
                  </div>
                </div>)
            })}
            </div>
            <div className="row m-0 w-100 h-25 align-items-center p-2">
                <textarea onChange={(e) => setMsj(e.target.value)} value={msj} className="col-9 h-100 rounded "/>
                <button className="col-3 p-2  m-auto buttonSend" onClick={() => send()}> Enviar</button>

            </div>
            </div>
        </>}
        </div>
    </section>
  )
}

export default Chat
