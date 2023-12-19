import connectDB from '../../../lib/dbconnect'
import { NextResponse } from 'next/server'
import Whatsapp from '../../../models/whatsapp'
export async function POST (request) {
  try {
    await connectDB()

    const { companyId, idPhone, tokenAuthorization, tokenWebhook, webhookPath } = await request.json()

    const userFound = await Whatsapp.findOne({ company_id: companyId })
    if (userFound) {
      if (userFound.id_phone !== 'empty' & userFound.token_authorization !== 'empty') {
        return NextResponse.json(
          {
            message: 'nada nuevo'
          },
          {
            status: 200
          }
        )
      }
      userFound.id_phone = idPhone
      userFound.token_authorization = tokenAuthorization
      userFound.save()
      return NextResponse.json(
        {
          message: userFound
        },
        {
          status: 200
        }
      )
    }

    const newWhatsapp = new Whatsapp({
      company_id: companyId,
      token_webhook: tokenWebhook,
      webhook_path: webhookPath,
      token_authorization: tokenAuthorization,
      id_phone: idPhone,
      chats: []
    })

    const savedUser = await newWhatsapp.save()
    return NextResponse.json(
      { message: savedUser },
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
