import express from 'express'

const app = express()

const PORT = 3000

app.get('/',(req,res)=>{
    res.send('hola')
})

app.listen(PORT,()=>{
    console.log(`escuchando desde http://localhost:${PORT}`)
})
