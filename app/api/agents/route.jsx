import connectDB from '../../lib/dbconnect'
import User from '../../models/Users'
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    await connectDB()

    const { id } = await request.json()
    const company = await User.findOne({ _id: id })

    const list = await User.find({ company: company.company })
    const userList = list.filter((data) => data.rol === 'agent')

    if (userList) {
      return NextResponse.json(
        {
          userList
        })
    }
    if (!userList) {
      return NextResponse.json(
        {
          message: 'Agentes no registrados'
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
