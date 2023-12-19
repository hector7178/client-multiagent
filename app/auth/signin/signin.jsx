'use client'

import React, { useState } from 'react'
import './signin.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import Button from '../../components/Button'

function Signin () {
  const [error, setError] = useState('')

  const router = useRouter()

  const schema = yup.object({
    password: yup.string().min(8, 'min 8 characters').max(12, 'max 12 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.:\\$%\\^&\\*])(?=.{8,})/, 'Must Contain Uppercase, Lowercase, Number and special Character').required('Password is required'),
    username: yup.string().min(4, 'min 4 characters').max(10, 'max 10 characters').required('username is required')
  })

  const { handleSubmit, formState: { errors }, register, getValues } = useForm({ resolver: yupResolver(schema) })

  const Submit = async (event) => {
    const res = await signIn('credentials', {
      username: getValues('username'),
      password: getValues('password'),
      redirect: false
    })
    if (res?.error) return setError('Invalid credentials!')

    return router.push('/dashboard')
  }

  return (
    <main
    style={{ backgroundImage: 'url(https://client-multiagent-091c69d69e79.herokuapp.com/page3.svg)', backgroundSize: 'cover' }}
    className="main-signin justify-content-center row m-0">
      <section className='shadow-lg section rounded row  bg-white h-100  align-items-center'>
        <div className='col-5  rounded d-none d-lg-flex'>
          <Image src={'/signiin.svg'} width={300} height={400} className='w-75 h-75' alt='signin image' />
        </div>
        <div className='col-lg-5  '>

          <form onSubmit={handleSubmit(Submit)} className='p-2 bg-white d-flex flex-column gap-2 '>
            <h2>Iniciar sesión</h2>
            <div className='d-flex flex-column'>
            <span className='text-danger'>{error}</span>
            <label className='' >Usuario</label>
            <span className='text-danger error '>{errors?.username?.message}</span>
            <input
             {...register('username', { required: true })}
            className='input rounded'
            type='text'
            name='username'></input>
            </div>

            <div className='d-flex flex-column '>
            <label className='' >Constraseña</label>
            <span className='text-danger error'>{errors?.password?.message}</span>
            <input
             {...register('password', { required: true })}
            className=' input rounded'
            type='password'
            name='password'></input>
            </div>
            <Button
            type='submit'
            className='rounded p-2'
            >Iniciar sesión</Button>
            <span className=''>¿No tienes una cuenta? <Link href={'/auth/register'} style={{ color: '#00ADB5' }}>Regístrate</Link></span>
          </form>

        </div>
      </section>
    </main>
  )
}

export default Signin
