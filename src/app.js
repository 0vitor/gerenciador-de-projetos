import express from 'express'
import colaboratorRouter from "./Router/collaborator.js"

const app = express()

app.use("/colaboradores", colaboratorRouter)

export default app
