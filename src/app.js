import express from 'express'
import colaboratorRouter from "./router/collaborator.js"
import userRouter from "./router/user.js"
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = `mongodb+srv://bancoTDD:${process.env.PASSOWRDSERVER}@demo.qiebebi.mongodb.net/?retryWrites=true&w=majority`
mongoose.set('strictQuery', true)
mongoose.connect(url)

mongoose.connection.on('connected', () => {
  console.log('conectado')
})

const app = express()
app.use(express.json())

app.use("/colaboradores", colaboratorRouter)
app.use("/auth", userRouter)

export default app
