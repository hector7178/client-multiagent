import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  company_id: {
    type: String,
    required: [true, 'Please specify the Company.'],
    unique: true
  },
  token_authorization: {
    type: String
  },
  id_page: {
    type: String
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

export default mongoose?.models?.instagram || mongoose.model('instagram', userSchema)
