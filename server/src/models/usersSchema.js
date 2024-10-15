import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const User = mongoose.model('User', usersSchema)

export { User }
