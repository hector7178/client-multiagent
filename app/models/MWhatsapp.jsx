import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  company_id: {
    type: String,
    required: [true, 'Please specify the Company.'],
    unique: true
  },
  token_authorization: {
    type: String,
    required: [true, 'Please specify the token.']
  },
  id_phone: {
    type: String,
    required: [true, 'Please specify the Phone.']
  },
  token_webhook: {
    type: String,
    required: [true, 'Please specify the token.']
  },
  webhook_path: {
    type: String,
    required: [true, 'Please specify the path.']
  },
  chats: {
    type: Array
  }

})

export default mongoose?.models?.whatsapp || mongoose.model('whatsapp', userSchema)
