import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Collaborator from "../../model/collaborator.js"

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

export { makeAuth }