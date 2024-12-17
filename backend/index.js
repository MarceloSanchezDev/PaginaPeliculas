import express, {json} from 'express'
import cors from 'cors'

const app = express()
app.use(json())
app.use(cors())
const PORT = 3000

app.get('/',(req,res)=>{
    res.json({user: 'Marcelo'})
})
app.post('/login',(req,res)=>{
    console.log(req.body)
    res.status(200).json(req.body)
})

app.listen(PORT,()=>{
    console.log(`escuchando desde http://localhost:${PORT}`)
})
