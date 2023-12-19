import connectDB from '../../../lib/dbconnect'
import User from '../../../models/Users'
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    await connectDB()

    const { id, company } = await request.json()

    const list = await User.findOne({ _id: id })

    if (list && list.rol === 'agent' && list.company === company) {
      await User.deleteOne({ _id: id })
      return NextResponse.json(
        {
          delete: 'agente eliminado exitosamente'
        })
    }
    if (!list) {
      return NextResponse.json(
        {
          message: 'Agentes no registrados'
        }
      )
    }
    if (list.rol !== 'agent') {
      return NextResponse.json(
        {
          message: 'No valido'
        }
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message
      },
      {
        status: 400
      }
    )
  }
}
