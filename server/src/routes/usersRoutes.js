import express from 'express'
import { getAllUsersController, addNewUserController } from '../controllers/userController.js'

export const usersRoutes = express.Router()

usersRoutes.get('/users', getAllUsersController)
usersRoutes.post('/users', addNewUserController)