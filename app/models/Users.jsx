import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a usuario.'],
    maxlength: [12, 'Name cannot be more than 6 characters'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'Please specify Email.'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please specify the Password.']
  },
  company: {
    type: String,
    required: [true, 'Please specify the Company.']
  },
  whatsapp: {
    type: Boolean
  },
  instagram: {
    type: Boolean
  },
  messenger: {
    type: Boolean
  },
  id_company: {
    type: String
  },
  rol: {
    type: String
  },
  creation_date: {
    type: Date
  }

})

export default mongoose?.models?.user || mongoose.model('user', userSchema)
