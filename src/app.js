import express from 'express'
import colaboratorRouter from "./router/collaborator.js"
import userRouter from "./router/user.js"
import connectDataBase from './infra/mongodb/mongo-login.js'

const url = `mongodb+srv://bancoTDD:${process.env.PASSOWRDSERVER}@demo.qiebebi.mongodb.net/?retryWrites=true&w=majority`
const app = express()

connectDataBase(url)

app.use(express.json())
app.use("/colaboradores", colaboratorRouter)
app.use("/auth", userRouter)

export default app
