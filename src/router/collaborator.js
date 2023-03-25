import express from 'express'
import collaboratorController from '../controller/collaborator-controller.js'
import { verifyToken } from '../infra/auth/user-authentication.js'

const router = express.Router()

router.get('/', (req, res) => collaboratorController.getAll(req, res))
router.get('/findByEmail', (req, res) => collaboratorController.getEmail(req, res))
router.post('/', verifyToken, (req, res) => collaboratorController.save(req, res))
router.put('/', verifyToken, (req, res) => collaboratorController.update(req, res))
router.delete('/', verifyToken, (req, res) => collaboratorController.deleteAll(req, res))
router.delete('/deleteByEmail', verifyToken, (req, res) => collaboratorController.deleteByEmail(req, res))

export default router