import connectDB from '../../lib/dbconnect'
import { NextResponse } from 'next/server'

export async function POST (request) {
  try {
    await connectDB()
    const server = 'https://multiagent-829b0de14a8c.herokuapp.com'

    const { idSend, msj, element } = await request.json()
    console.log(idSend, msj, element)
    const res = await fetch(`https://multiagent-829b0de14a8c.herokuapp.com/message${element.replace(server, '')}`, {
      method: 'POST',
      body: JSON.stringify({
        id_send: idSend,
        msj
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    return NextResponse.json(
      {
        message: data
      },
      {
        status: 200
      }
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
