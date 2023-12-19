import connectDB from '../../../lib/dbconnect'
import { NextResponse } from 'next/server'
import Instagram from '../../../models/Instagram'
export async function POST (request) {
  try {
    await connectDB()

    const { companyId, idPage, tokenAuthorization, tokenWebhook, webhookPath } = await request.json()

    const userFound = await Instagram.findOne({ company_id: companyId })

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
          status: 200
        }
      )
    }

    const newInstagram = new Instagram({
      company_id: companyId,
      token_webhook: tokenWebhook,
      webhook_path: webhookPath,
      token_authorization: tokenAuthorization,
      id_page: idPage,
      chats: []
    })

    const savedUser = await newInstagram.save()
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
