import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  identy: {
    type: String,
    required: [true, 'Please specify the identy']
  },
  type: {
    type: String
  },
  company_id: {
    type: String
  },
  chat: [{
    id: String,
    user: String,
    msj: String
  }]

})

export default mongoose?.models?.chat || mongoose.model('chat', userSchema)
