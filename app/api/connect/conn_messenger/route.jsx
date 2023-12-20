import connectDB from '../../../lib/dbconnect'
import { NextResponse } from 'next/server'
import Messenger from '../../../models/Messenger'
export async function POST (request) {
  try {
    await connectDB()

    const { companyId, idPage, tokenAuthorization, tokenWebhook, webhookPath } = await request.json()

    const userFound = await Messenger.findOne({ company_id: companyId })

    if (userFound) {
      if (userFound.id_page !== 'empty' & userFound.token_authorization !== 'empty') {
        return NextResponse.json(
          {
            message: userFound
          },
          {
            status: 200
          }
        )
      }
      userFound.id_page = idPage
      userFound.token_authorization = tokenAuthorization
      userFound.save()
      return NextResponse.json(
        {
          message: userFound
        },
        {
          status: 202
        }
      )
    }

    const newMessenger = new Messenger({
      company_id: companyId,
      token_webhook: tokenWebhook,
      token_authorization: tokenAuthorization,
      id_page: idPage,
      webhook_path: webhookPath,
      chats: []
    })

    const savedUser = await newMessenger.save()
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
