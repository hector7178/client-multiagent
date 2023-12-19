'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import './register.css'
import Button from '../../components/Button'

function Register () {
  const router = useRouter()

  const schema = yup.object({
    email: yup.string().email('Correo inválido').required('Correo es requerido'),
    company: yup.string().min(8, 'min 8 caracteres').required('compañia es requerido'),
    password: yup.string().min(8, 'min 8 caracteres').max(12, 'max 12 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.:$%^&*])(?=.{8,})/, 'Debe contener almenos una mayúscula, una minúscula, un número y un caracter especial ').required('Contraseña es requerida'),
    username: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres').required('Usuario es requerido')
  })
  const { handleSubmit, formState: { errors }, register, getValues } = useForm({ resolver: yupResolver(schema) })

  const submitchange = async (e) => {
    try {
      const signupResponse = await fetch('/api/signup', {
        method: 'POST',

        body: JSON.stringify({
          email: getValues('email'),
          password: getValues('password'),
          username: getValues('username'),
          company: getValues('company'),
          rol: 'company'
        })
      })

      if (signupResponse?.ok) {
        return router.push('/auth/signin')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main
    style={{ backgroundImage: 'url(' + '../page3.svg' + ')', backgroundSize: 'cover' }}
    className="p-5 main-register justify-content-center row m-0 p-0">

      <section className='shadow-lg section rounded row m-0 bg-white h-100  align-items-center'>
        <div className='col-5  rounded d-none d-lg-flex'>
          <Image src={'/register.svg'} width={300} height={400} alt='register image' className='w-75 h-75'/>
        </div>
        <div className='col-lg-6  '>

          <form method='POST' onSubmit={handleSubmit(submitchange)} className='p-2 bg-white d-flex flex-column gap-2 '>
            <h2>Regístrate</h2>
            <div className='d-flex flex-column'>
              <span className=''></span>
            <label className='' >Usuario</label>
            <span className='text-danger error'>{errors?.username?.message}</span>
            <input
             {...register('username', { required: true })}
            className='input rounded'
            type='text'
            name='username'></input>
            </div>
            <div className='d-flex flex-column'>
              <span className=''></span>
            <label className='' >Empresa</label>
            <span className='text-danger error'>{errors?.company?.message}</span>
            <input
             {...register('company', { required: true })}
            className='input rounded'
            type='text'
            name='company'></input>
            </div>
            <div className='d-flex flex-column'>
            <label className='' >Correo</label>
            <span className='text-danger error'>{errors?.email?.message}</span>
            <input
             {...register('email', { required: true })}
            className='input rounded'
            type='email'
            name='email'></input>
            </div>

            <div className='d-flex flex-column '>
            <label className='' >Contraseña</label>
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
            >Regístrate</Button>
            <span className='' >ya tienes una cuenta? <Link style={{ color: '#00ADB5' }} href={'/auth/signin'}>Inicia sesión</Link></span>
          </form>

        </div>
      </section>

    </main>
  )
}

export default Register
