import express, {json} from 'express'
import path from 'path'
import cors from 'cors'
import { requestLogger, unknownEndpoint, errorHandler } from './utilsBackend/middleware.js'
import { authRouter } from './routes/auth.js'
import {API_KEY} from './utilsBackend/config.js'

export const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(cors())
app.use(requestLogger)
app.get('/apikey',(req,res)=>{
    res.json({ apikey: API_KEY })
})
app.use('/auth', authRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

