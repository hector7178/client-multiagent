import connectDB from '../../../lib/dbconnect'
import User from '../../../models/Users'
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    await connectDB()

    const { email, password, username, id } = await request.json()
    if (password < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const userFound = await User.findOne({ _id: id })

    if (userFound) {
      userFound.username = username
      userFound.email = email
      userFound.password = password
      const savedUser = await userFound.save()
      return NextResponse.json(
        {
          username,
          updatedAt: savedUser.updatedAt
        },
        { status: 201 }
      )
    }
    return NextResponse.json(
      {
        msj: 'user no encontrado'
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
