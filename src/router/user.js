import express from 'express'
import { makeAuth, verifyToken } from '../infra/auth/user-authentication.js'

const router = express.Router()

router.get('/', verifyToken, (req, res) => res.send('deu certo'))
router.post('/', (req, res) => makeAuth(req, res))

export default router