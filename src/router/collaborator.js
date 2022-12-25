import express from 'express'
import collaboratorController from '../controller/collaborator-controller.js' 

const router = express.Router()

router.get('/', (req, res) => collaboratorController.getAll(req, res))

export default router