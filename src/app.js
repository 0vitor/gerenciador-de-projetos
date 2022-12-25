import express from 'express'
import colaboratorRouter from "./router/collaborator.js"
import mongoose from 'mongoose'

const url = "mongodb+srv://bancoTDD:n303qDfGy6VWnrjd@demo.qiebebi.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery', true)
mongoose.connect(url)

mongoose.connection.on('connected', () => {
  console.log('conectado')
})

const app = express()
app.use(express.json())

app.use("/colaboradores", colaboratorRouter)

export default app
