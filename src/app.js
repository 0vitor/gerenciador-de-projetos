import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' assert {type: 'json'}
import colaboratorRouter from "./router/collaborator.js"
import projectRouter from "./router/project.js"
import companyRouter from "./router/company.js"
import userRouter from "./router/user.js"
import connectDataBase from './infra/mongodb/mongo-login.js'
import cors from "cors"

const url = `mongodb+srv://bancoTDD:${process.env.PASSOWRDSERVER}@demo.qiebebi.mongodb.net/?retryWrites=true&w=majority`
const app = express()

connectDataBase(url)

app.use(cors())
app.use(express.json())
app.use("/auth", userRouter)
app.use("/project", projectRouter)
app.use("/colaboradores", colaboratorRouter)
app.use("/company", companyRouter)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
export default app
