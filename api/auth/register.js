import { Router } from 'express'
import { UserController } from '../controllers/user.js'

export const authRouter = Router()

authRouter.post('/register', UserController.registerUser)