import jwt from "jsonwebtoken"
import Collaborator from "../../model/collaborator.js"
import verifyPassowrd from "../cryptography/verify-passowrd.js"

const makeAuth = async (req, res) => {
  const { email, passowrd } = req.body
  try {
    const collaborator = await Collaborator.findOne({ email }).select('+passowrd')
    if (await verifyPassowrd(passowrd, collaborator.passowrd)) {
      const { _id } = collaborator
      const token = jwt.sign({ _id }, process.env.PRIVATE_KEY, { expiresIn: 200 })
      res.send({ auth: true, token: token })
    }

  } catch (error) {
    return res.status(400).send('usuario inexistente').end()
  }
}

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(400).send('token invalido').end()
    }
    next()
  })
}

export { makeAuth, verifyToken }