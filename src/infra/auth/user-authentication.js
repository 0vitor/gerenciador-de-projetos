import jwt from "jsonwebtoken"
import Collaborator from "../../model/collaborator.js"
import verifyPassowrd from "../cryptography/verify-passowrd.js"

const makeAuth = async (req, res) => {
  const { email, passowrd } = req.body
  try {
    const collaborator = await Collaborator.findOne({ email }).select('+passowrd')
    if (await verifyPassowrd(passowrd, collaborator.passowrd)) {
      const { _id } = collaborator
      const token = jwt.sign({ _id }, process.env.PRIVATE_KEY, { expiresIn: "3 days" })
      res.send({ auth: true, token: token })
    } 
  } catch (err) {
    return res.status(401).send(err.message)
  }
}

const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token']
  jwt.verify(token, process.env.PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send(err.message)
    }
    next()
  })
}

export { makeAuth, verifyToken }