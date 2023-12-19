'use client'
import Button from '../../../components/Button'
import './whatsapp.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import GenerateToken from '../../../utils/TokenGen'

function RegisterAccount (prop) {
  const router = useRouter()
  const server = 'https://multiagent-829b0de14a8c.herokuapp.com'

  const { data: session } = useSession()
  const [errorRes, setErrorRes] = useState()
  const [generate, setGenerate] = useState(false)
  const [dataWebhook, setDataWebhook] = useState()
  useEffect(() => {
    if (session) {
      const res = async () => await fetch('/api/profile', { method: 'POST', body: JSON.stringify({ id: session.user.rol === 'agent' ? session.user.id_company : session.user._id }) })
      res().then((res) => {
        res.json().then(async (data) => {
          const update = await fetch('/api/connect/conn_whatsapp', {
            method: 'POST',

            body: JSON.stringify({
              companyId: data.profile?._id,
              idPhone: 'empty',
              tokenAuthorization: 'empty',
              tokenWebhook: GenerateToken(50),
              webhookPath: `${server}/whatsapp/${data.profile?.company}/webhook`
            })
          })

          if (update?.ok) {
            update.json().then((res) => setDataWebhook(res?.message)).catch(err => console.error(err))
          }
        })
      })
    }
  }, [session])

  const schema = yup.object({
    token_auth: yup.string().required('token de autorizacion requerido'),
    id_number: yup.string().required('id de numero es requerido')
  })

  const changeGenerate = () => {
    setGenerate(true)
  }

  const { handleSubmit, formState: { errors }, register, getValues } = useForm({ resolver: yupResolver(schema) })

  const submitchange = async (e) => {
    try {
      const verify = await fetch(`https://graph.facebook.com/${getValues('id_number')}?access_token=${getValues('token_auth')}`)
      const verifyRes = await verify.json()
      if (!verifyRes.error) {
        if (verifyRes.id === getValues('id_number')) {
          const res = async () => await fetch('/api/profile', { method: 'POST', body: JSON.stringify({ id: session.user.rol === 'agent' ? session.user.id_company : session.user._id }) })
          res().then((res) => {
            res.json().then(async (data) => {
              const update = await fetch('/api/connect/conn_whatsapp', {
                method: 'POST',

                body: JSON.stringify({
                  companyId: session.user.rol === 'agent' ? session.user.id_company : session.user._id,
                  idPhone: getValues('id_number'),
                  tokenAuthorization: getValues('token_auth'),
                  tokenWebhook: GenerateToken(50),
                  webhookPath: `${server}/whatsapp/${data.profile?.company}/webhook`
                })
              })

              if (update?.ok) {
                const res = async () => await fetch('/api/edit/company', { method: 'POST', body: JSON.stringify({ ...data.profile, id: data.profile._id, whatsapp: true }) })
                res().then((res) => {
                  res.json().then((data) => console.log(data))
                })
                router.refresh()
              }
            })
          })
        } else {
          setErrorRes('Error,datos no validos')
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div>
      <h3>Conecta tu cuenta de whatsapp</h3>
    </div>
    <div className='p-4 row align-self-center justify-content-center bg-secondary-subtle rounded w-75 h-75'>

        {prop.status
          ? generate
            ? <form onSubmit={handleSubmit(submitchange)} className='row gap-2 h-75'>
            <span className='text-danger'>{errorRes}</span>
            <div className='row'>
                <label className='label col-12 p-0'>Token de autorización</label>
                <span className='text-danger error'>{errors?.token_auth?.message}</span>
                <input {...register('token_auth')} className='input text-black col-12 col-lg-10 rounded'></input>
            </div>
            <div className='row'>
                <label className='label col-12 p-0'>Id telefono</label>
                <span className='text-danger error'>{errors?.id_number?.message}</span>
                <input {...register('id_number')} className='input text-black col-12 col-lg-10 rounded'></input>
            </div>
            <Button type='submit' className=' fs-5 p-2 rounded'>Conectar</Button>
            </form>
            : <section className='row gap-2 h-75'>
                <div className='row gap-2 flex-column'>
                  <label>Ruta webhook</label>
                  <input defaultValue={dataWebhook?.webhook_path} disabled/>
                </div>
                <div className='row gap-2 flex-column'>
                  <label>Token webhook</label>
                  <input defaultValue={dataWebhook?.token_webhook} disabled/>
                </div>
                <Button className='p-2 rounded' onClick={() => changeGenerate()}>Conectar</Button>
            </section>
          : <span>Estado de la cuenta: No conectada</span>}
    </div>
    </>
  )
}

export default RegisterAccount
