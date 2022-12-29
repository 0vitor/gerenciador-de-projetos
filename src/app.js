import express from 'express'
import colaboratorRouter from "./router/collaborator.js"
import projectRouter from "./router/project.js"
import userRouter from "./router/user.js"
import connectDataBase from './infra/mongodb/mongo-login.js'

const url = `mongodb+srv://bancoTDD:${process.env.PASSOWRDSERVER}@demo.qiebebi.mongodb.net/?retryWrites=true&w=majority`
const app = express()

connectDataBase(url)

app.use(express.json())
app.use("/auth", userRouter)
app.use("/project", projectRouter)
app.use("/colaboradores", colaboratorRouter)

export default app
