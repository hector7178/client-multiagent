'use client'
import React from 'react'
import ArrowLeftIcon from '../../../components/svgIcons/ArrowLeftIcon'
import './new.css'
import Button from '../../../components/Button'
import Link from 'next/link'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
function page () {
  const router = useRouter()

  const schema = yup.object({
    email: yup.string().email('Correo inválido').required('Correo es requerido'),
    password: yup.string().min(8, 'min 8 caracteres').max(12, 'max 12 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.:$%^&*])(?=.{8,})/, 'Debe contener almenos una mayúscula, una minúscula, un número y un caracter especial ').required('Contraseña es requerida'),
    username: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres').required('Usuario es requerido')
  })
  const { handleSubmit, formState: { errors }, register, getValues } = useForm({ resolver: yupResolver(schema) })

  const { data: session } = useSession()

  const submitchange = async (e) => {
    try {
      const signupResponse = await fetch('/api/signup', {
        method: 'POST',

        body: JSON.stringify({
          email: getValues('email'),
          password: getValues('password'),
          username: getValues('username'),
          idCompany: session.user._id,
          company: session.user.company,
          rol: 'agent'
        })
      })

      if (signupResponse?.ok) {
        router.refresh()
        return router.push('/dashboard/agent')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
<main className='d-flex flex-column bg-white w-100 main '>
    <div className="row gap-4">
        <div className='col-12'>
            <Link href={'/dashboard/agent'}><ArrowLeftIcon className='icon'/></Link>
        </div>
        <h3 className='col-12' style={{ color: '#00ADB5' }}>Nuevo agente</h3>
        <form method='POST' onSubmit={handleSubmit(submitchange)} className='p-2 bg-white d-flex flex-column gap-2 '>
            <div className='d-flex flex-column'>
              <span className=''></span>
            <label className='' >Usuario</label>
            <span className='text-danger error'>{errors?.username?.message}</span>
            <input
             {...register('username', { required: true })}
            className='input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='text'
            name='username'></input>
            </div>
            <div className='d-flex flex-column'>
            <label className='' >Correo</label>
            <span className='text-danger error'>{errors?.email?.message}</span>
            <input
             {...register('email', { required: true })}
            className='input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='email'
            name='email'></input>
            </div>

            <div className='d-flex flex-column '>
            <label className='' >Contraseña</label>
            <span className='text-danger error'>{errors?.password?.message}</span>
            <input
             {...register('password', { required: true })}
            className=' input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='password'
            name='password'></input>
            </div>
            <Button
            type='submit'
            className='rounded p-2'
            >Registrar</Button>

          </form>
    </div>
</main>
  )
}

export default page
