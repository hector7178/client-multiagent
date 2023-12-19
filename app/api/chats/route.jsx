import connectDB from '../../lib/dbconnect'
import Chats from '../../models/Chats'
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    await connectDB()

    const { id, type } = await request.json()
    const chats = await Chats.find({ company_id: id, type })

    if (chats) {
      return NextResponse.json(
        {
          chats
        })
    }
    if (!chats) {
      return NextResponse.json(
        {
          message: 'chats no registrados'
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
