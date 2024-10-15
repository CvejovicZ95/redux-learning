import express from 'express'
import { getAllPostsController, addPostController, updatePostReactionsController } from '../controllers/postController.js'

export const postsRouter = express.Router()

postsRouter.get('/posts', getAllPostsController)
postsRouter.post('/posts', addPostController)
postsRouter.put('/posts/:id', updatePostReactionsController);

