import express, {json} from 'express'
import cors from 'cors'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'
import { authRouter } from './routes/auth.js'

export const PORT = 3000
export const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(cors())
app.use(requestLogger)
app.use('/auth', authRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

