import express from 'express'
import { verifyToken } from '../infra/auth/user-authentication.js'
import projectController from '../controller/project-controller.js' 

const router = express.Router()

router.get('/', verifyToken, (req, res) => projectController.getAll(req, res))
router.get('/one', verifyToken, (req, res) => projectController.getOne(req, res))
router.post('/', verifyToken, (req, res) => projectController.save(req, res))
//router.put('/', (req, res) => projectController.update(req, res))
//router.delete('/', (req, res) => projectController.deleteAll(req, res))
//router.delete('/one', (req, res) => projectController.deleteOne(req, res))

export default router