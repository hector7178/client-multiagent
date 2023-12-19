'use client'
import Button from '../../../components/Button'
import Link from 'next/link'
import ArrowLeftIcon from '../../../components/svgIcons/ArrowLeftIcon'
import './edit.css'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter, useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

function page () {
  const router = useRouter()

  const params = useSearchParams()

  const { data: session } = useSession()

  const schema = yup.object({
    email: yup.string().email('Correo inválido'),
    password: yup.string().min(8, 'min 8 caracteres').max(12, 'max 12 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.:$%^&*])(?=.{8,})/, 'Debe contener almenos una mayúscula, una minúscula, un número y un caracter especial '),
    username: yup.string().min(4, 'min 4 caracteres').max(10, 'max 10 caracteres')
  })
  const { handleSubmit, formState: { errors }, register, getValues, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: params.get('email'), username: params.get('username'), password: '' }
  })
  useEffect(() => {
    if (session?.user?.password) {
      setValue('password', session.user.password)
    }
  }, [session])

  const submitchange = async (e) => {
    try {
      const signupResponse = await fetch('/api/edit/agent', {
        method: 'POST',

        body: JSON.stringify({
          email: getValues('email'),
          password: getValues('password'),
          username: getValues('username'),
          id: params.get('id')
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
        <h3 className='col-12' style={{ color: '#00ADB5' }}>Editar agente</h3>
        <form method='POST' onSubmit={handleSubmit(submitchange)} className='p-2 bg-white d-flex flex-column gap-2 '>
            <div className='d-flex flex-column'>
              <span className=''></span>
            <label className='' >Usuario</label>
            <span className='text-danger error'>{errors?.username?.message}</span>
            <input
             {...register('username')}
            className='input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='text'
            name='username'></input>
            </div>
            <div className='d-flex flex-column'>
            <label className='' >Correo</label>
            <span className='text-danger error'>{errors?.email?.message}</span>
            <input
             {...register('email')}
            className='input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='email'
            name='email'></input>
            </div>

            <div className='d-flex flex-column '>
            <label className='' >Contraseña</label>
            <span className='text-danger error'>{errors?.password?.message}</span>
            <input
             {...register('password')}
            className=' input rounded col-lg-6 col-md-8 col-sm-10 col-12'
            type='password'
            name='password'></input>
            </div>
            <Button
            type='submit'
            className='rounded p-2'
            >Guardar</Button>

          </form>
    </div>
</main>
  )
}

export default page
