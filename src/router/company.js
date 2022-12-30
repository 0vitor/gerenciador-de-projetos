import express from 'express'
import companyController from '../controller/company-controller.js'
import { verifyToken } from '../infra/auth/user-authentication.js'

const router = express.Router()

router.get('/', verifyToken, (req, res) => companyController.getAll(req, res))
router.get('/one', verifyToken, (req, res) => companyController.getOne(req, res))
router.post('/', verifyToken, (req, res) => companyController.save(req, res))
router.put('/', verifyToken, (req, res) => companyController.update(req, res))
router.delete('/', verifyToken, (req, res) => companyController.deleteAll(req, res))
router.delete('/one', verifyToken, (req, res) => companyController.deleteOne(req, res))

export default router