import express from 'express'
import { getAllPostsController, addPostController } from '../controllers/postController.js'

export const postsRouter = express.Router()

postsRouter.get('/posts', getAllPostsController)
postsRouter.post('/posts', addPostController)

