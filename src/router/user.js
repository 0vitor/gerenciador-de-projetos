import express from 'express'
import jwt from 'jsonwebtoken'
import { makeAuth } from '../infra/auth/user-authentication.js'

const router = express.Router()

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).send('token invalido').end()
    }
    next()
  })
}

router.get('/', verifyToken, (req, res) => res.send('deu certo'))
router.post('/', (req, res) => makeAuth(req, res))

export default router