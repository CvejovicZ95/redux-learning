import mongoose from 'mongoose'

const postsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reactions: {
    thumbsUp: { type: Number, default: 0 },
    love: { type: Number, default: 0 },
    laugh: { type: Number, default: 0 },
    surprised: { type: Number, default: 0 },
    sad: { type: Number, default: 0 },
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
})

const Post = mongoose.model('Post', postsSchema)

export { Post }
