import express from 'express'
import jwt from 'jsonwebtoken'
import Collaborator from '../model/collaborator.js'

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

const makeAuth = async (req, res) => {
  const { email, passowrd } = req.body
  try {
    const collaborator = await Collaborator.findOne({ email, passowrd }).select('+passowrd')
    bcrypt.compare(passowrd, collaborator.passowrd)
    const token = jwt.sign(collaborator._id, process.env.PRIVATE_KEY, { expiresIn: 200 })
    res.send({ auth: true, token: token })
  } catch (error) {
    return res.status(400).send('user not exist').end()
  }
}

router.get('/', verifyToken, (req, res) => res.send('deu certo'))
router.post('/', (req, res) => makeAuth(req, res))

export default router