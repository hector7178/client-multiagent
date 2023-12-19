'use client'
import React, { useEffect } from 'react'
import './profile.css'
import * as yup from 'yup'
import Button from '../../components/Button'
import { useRouter } from 'next/navigation'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'
function page () {
  const router = useRouter()

  const schema = yup.object({
    email: yup.string().email('Correo inválido'),
    password: yup.string().min(8, 'min 8 caracteres').max(12, 'max 12 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.:$%^&*])(?=.{8,})/, 'Debe contener almenos una mayúscula, una minúscula, un número y un caracter especial '),
    username: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres'),
    company: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres')
  })
  const { handleSubmit, formState: { errors }, register, getValues, setValue } = useForm({ resolver: yupResolver(schema) })

  const { data: session, update } = useSession()

  useEffect(() => {
    if (session?.user?._id) {
      const res = fetch('/api/profile', { method: 'POST', body: JSON.stringify({ id: session?.user?._id }) })
      res.then((response) => response.json().then(data => {
        setValue('company', data.profile.company)
        setValue('email', data.profile.email)
        setValue('username', data.profile.username)
        setValue('password', data.profile.password)
      }))
    }
  }, [session])
  console.log(session)

  const submitchange = async (e) => {
    try {
      if (session?.user?.rol === 'company') {
        const signupResponse = await fetch('/api/edit/company', {
          method: 'POST',

          body: JSON.stringify({
            id: session.user._id,
            email: getValues('email'),
            password: getValues('password'),
            username: getValues('username'),
            company: getValues('company'),
            whatsapp: false,
            instagram: false,
            messenger: false,
            rol: 'company'
          })
        })

        if (signupResponse?.ok) {
          await update({ ...session, user: { ...session.user, username: getValues('username'), company: getValues('company'), password: getValues('password'), email: getValues('email') } })
          router.refresh()
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className='row bg-white w-100 main gap-2 align-content-start'>
        <div className='row col-12'>
          <h3 className=''>Perfil</h3>
        </div>

        <form method='POST' onSubmit={handleSubmit(submitchange)} className='p-2 bg-white d-flex flex-column gap-2 '>
            <div className='d-flex flex-column'>
              <span className=''></span>
            <label className='' >Usuario</label>
            <span className='text-danger error'>{errors?.username?.message}</span>
            <input
             {...register('username')}
            className='input data rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='text'
            name='username'
            disabled={!(session?.user?.rol === 'company')}></input>
            </div>
            <div className='d-flex flex-column'>
            <label className='' >Empresa</label>
            <span className='text-danger error'>{errors?.company?.message}</span>
            <input
             {...register('company')}
            className='input data rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='text'
            name='company'
            disabled={!(session?.user?.rol === 'company')}></input>
            </div>
            <div className='d-flex flex-column'>
            <label className='' >Correo</label>
            <span className='text-danger error'>{errors?.email?.message}</span>
            <input
             {...register('email')}
            className='input data rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='email'
            name='email'
            disabled={!(session?.user?.rol === 'company')}></input>
            </div>

            <div className='d-flex flex-column '>
            <label className='' >Contraseña</label>
            <span className='text-danger error'>{errors?.password?.message}</span>
            <input
             {...register('password')}
            className='data input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='password'
            name='password'
            disabled={!(session?.user?.rol === 'company')}></input>
            </div>
            {session?.user?.rol === 'company'
              ? <Button
            type='submit'
            className='rounded p-2'
            >Guardar</Button>
              : null}

          </form>
        <div className='row col-6'></div>

    </main>
  )
}

export default page
