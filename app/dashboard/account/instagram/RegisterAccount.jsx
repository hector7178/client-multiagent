'use client'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button'
import { useSession } from 'next-auth/react'
import GenerateToken from '../../../utils/TokenGen'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Link from 'next/link'

function RegisterAccount (prop) {
  const { data: session } = useSession()
  const router = useRouter()
  const server = 'https://multiagent-829b0de14a8c.herokuapp.com/'
  const [errorRes, setErrorRes] = useState()
  const [generate, setGenerate] = useState(false)
  const [dataWebhook, setDataWebhook] = useState()
  const [valueIdent, setValueIdent] = useState('')

  const changeGenerate = () => {
    setGenerate(true)
  }

  useEffect(() => {
    if (session) {
      const res = async () => await fetch('/api/profile', { method: 'POST', body: JSON.stringify({ id: session.user.rol === 'agent' ? session.user.id_company : session.user._id }) })
      res().then((res) => {
        res.json().then(async (data) => {
          const url = window.location.href// Esto devuelve la URL completa
          const splitUrl = url?.split('#')
          const dataSplit = splitUrl[1]?.split('&')
          const tokenfilter = dataSplit?.filter(datas => {
            return datas.includes('access_token')
          })
          if (tokenfilter) {
            const tokenValue = tokenfilter[0]?.split('=')
            const fetchData = await fetch(`https://graph.facebook.com/v18.0/me/accounts?fields=id%2Cname%2Caccess_token%2Cinstagram_business_account&access_token=${tokenValue[1]}`, { method: 'GET' })
            const dataRes = await fetchData.json()
            if (dataRes) {
              const res = await fetch('/api/profile', { method: 'POST', body: JSON.stringify({ id: session.user.rol === 'agent' ? session.user.id_company : session.user._id }) })
              res.json().then(async (res) => {
                const update = await fetch('/api/connect/conn_instagram', {
                  method: 'POST',

                  body: JSON.stringify({
                    idPage: dataRes[0]?.instagram_business_account?.id,
                    tokenAuthorization: dataRes[0]?.access_token,
                    companyId: session.user.rol === 'agent' ? session.user.id_company : session.user._id,
                    tokenWebhook: GenerateToken(64),
                    webhookPath: `${server}/instagram/${res.profile?.company}/webhook`
                  })
                })

                if (update?.ok) {
                  const res = async () => await fetch('/api/edit/company', { method: 'POST', body: JSON.stringify({ ...data.profile, id: data.profile._id, instagram: true }) })
                  res().then((res) => {
                    res.json().then((data) => setDataWebhook(data?.message)).catch(err => console.error(err))
                  })

                  router.refresh()
                }
              }).catch(err => console.log('error line 99', err))
            }
          } else {
            const update = await fetch('/api/connect/conn_instagram', {
              method: 'POST',

              body: JSON.stringify({
                companyId: data.profile?._id,
                tokenWebhook: GenerateToken(64),
                idPage: 'empty',
                tokenAuthorization: 'empty',
                webhookPath: `${server}/instagram/${data.profile?.company}/webhook`
              })
            })

            if (update?.ok) {
              update.json().then((res) => setDataWebhook(res?.message)).catch(err => console.error(err))
            }
          }
        }).catch(err => setErrorRes(err))
      })
    }
  }, [session])

  const schema = yup.object({
    token_auth: yup.string(),
    id_number: yup.string(),
    id_aplicacion: yup.string().required('id aplicacion es requerido')
  })
  const { handleSubmit, formState: { errors }, register, setValue } = useForm({ resolver: yupResolver(schema), defaultValues: { id_number: '', token_auth: '' } })

  const handleIdent = (e) => {
    setValueIdent(e.target.value)
    setValue('id_aplicacion', e.target.value)
  }

  return (
    <>
    <div>
      <h3>Conecta tu cuenta de Instagram</h3>
    </div>
    <div className='p-4 row align-self-center justify-content-center bg-secondary-subtle rounded w-75 h-75'>

    {prop.status
      ? generate
        ? <form onSubmit={handleSubmit()} className='row gap-2 h-75'>
            <span className='text-danger'>{errorRes}</span>
            <div className='row'>
                <label className='label col-12 p-0'>Token de autorización</label>
                <span className='text-danger error'>{errors?.token_auth?.message}</span>
                <input {...register('token_auth')} disabled className='input text-black col-12 col-lg-10 rounded'></input>
            </div>
            <div className='row'>
                <label className='label col-12 p-0'>Id Account</label>
                <span className='text-danger error'>{errors?.token_auth?.message}</span>
                <input {...register('id_number')} disabled className='input text-black col-12 col-lg-10 rounded'></input>
            </div>
            <div className='row'>
                <label className='label col-12 p-0'>Ingresa el Identificador de la aplicación</label>
                <span className='text-danger error'>{errors?.id_aplicacion?.message}</span>
                <input onChange={(e) => handleIdent(e)} value={valueIdent} className='input text-black col-12 col-lg-10 rounded'></input>
            </div>

            <Button type='submit' className=' fs-5 p-2 rounded'>
              <Link href={`https://www.facebook.com/v18.0/dialog/oauth?client_id=${valueIdent}&display=page&extras={"setup":{"channel":"IG_API_ONBOARDING"}}&redirect_uri=http://localhost:3000/dashboard/account/instagram/&response_type=token&scope=instagram_basic,instagram_content_publish,instagram_manage_comments,instagram_manage_insights,pages_show_list,pages_read_engagement,instagram_manage_messages,business_management,pages_messaging,pages_read_user_content`} className='text-white'>Login</Link>
            </Button>
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
      : <span>Estado de la cuenta: No conectada</span>
    }
     </div>
    </>
  )
}

export default RegisterAccount
