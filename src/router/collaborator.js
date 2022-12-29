import express from 'express'
import collaboratorController from '../controller/collaborator-controller.js'
import { verifyToken } from '../infra/auth/user-authentication.js'

const router = express.Router()

router.get('/', verifyToken, (req, res) => collaboratorController.getAll(req, res))
router.get('/one', verifyToken, (req, res) => collaboratorController.getOne(req, res))
router.post('/', verifyToken, (req, res) => collaboratorController.save(req, res))
router.put('/', verifyToken, (req, res) => collaboratorController.update(req, res))
router.delete('/', verifyToken, (req, res) => collaboratorController.deleteAll(req, res))
router.delete('/one', verifyToken, (req, res) => collaboratorController.deleteOne(req, res))

export default router