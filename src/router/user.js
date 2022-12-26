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
  let userId;
  try {
  const { _id } = await Collaborator.findOne({ email, passowrd })
  userId = _id
  } catch(error) {
    res.status(400).end()
    console.log(error)
  }

  const token = jwt.sign({ userId }, process.env.PRIVATE_KEY, { expiresIn: 200 })
  res.send({ auth: true, token: token })
}

router.get('/', verifyToken, (req, res) => res.send('deu certo'))
router.post('/', (req, res) => makeAuth(req, res))

export default router