import express, {json} from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors'
import { requestLogger, unknownEndpoint, errorHandler } from './utils/middleware.js'
import { authRouter } from './routes/auth.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(cors())
app.use(requestLogger)
app.use(express.static('dist'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/auth', authRouter)
app.get('*', (req, res) => {res.sendFile(path.join(__dirname, 'dist', 'index.html'))})
app.use(unknownEndpoint)
app.use(errorHandler)

