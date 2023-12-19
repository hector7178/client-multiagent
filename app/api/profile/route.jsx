import connectDB from '../../lib/dbconnect'
import User from '../../models/Users'
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    await connectDB()

    const { id } = await request.json()
    const userFound = await User.findOne({ _id: id })

    if (userFound) {
      return NextResponse.json(
        {
          profile: userFound
        },
        { status: 201 }
      )
    }
    return NextResponse.json(
      {
        msj: 'usuario no encontrado'
      },
      { status: 201 }
    )
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
