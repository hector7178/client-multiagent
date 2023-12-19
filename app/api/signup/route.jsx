import connectDB from '../../lib/dbconnect'
import User from '../../models/Users'
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    await connectDB()

    const { company, email, password, username, rol, idCompany } = await request.json()

    if (password < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const userFound = await User.findOne({ email })
    const userNamefound = await User.findOne({ username })

    if (userFound) {
      return NextResponse.json(
        {
          message: 'Email already exists'
        },
        {
          status: 409
        }
      )
    }
    if (userNamefound) {
      return NextResponse.json(
        {
          message: 'username already exists'
        },
        {
          status: 409
        }
      )
    }
    const hashedPassword = password
    const date = new Date()
    const user = new User({
      username,
      email,
      password: hashedPassword,
      company,
      id_company: idCompany,
      whatsapp: false,
      instagram: false,
      messenger: false,
      rol,
      creation_date: date
    })

    const savedUser = await user.save()
    return NextResponse.json(
      {
        email,
        username,
        company,
        createdAt: savedUser.createdAt,
        updatedAt: savedUser.updatedAt
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
