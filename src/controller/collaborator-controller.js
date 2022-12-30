import Collaborator from "../model/collaborator.js"
import verifyPassowrd from "../infra/cryptography/verify-passowrd.js"
import collaboratorQuery from "../infra/mongodb/collaborator-query.js"

const getAll = async (req, res) => {
  const response = await Collaborator.find({})
  res.send(response)
}

const getOne = async (req, res) => {
  const { email } = req.body
  const response = await Collaborator.findOne({ email })
  res.send(response)
}

const save = async (req, res) => {
  const result = await collaboratorQuery.create(req.body)
  const emailAlreadyExist = 11000
  if (result == emailAlreadyExist) {
    res.send('email ja existe')
  } else if (!result) {
    res.status(400).send('ocorreu um erro')
  } else {
    res.send('registrado com sucesso')
  }
}

const update = async (req, res) => {
  const response = await collaboratorQuery.updateOne(req.body)
  const emailAlreadyExist = 11000
  if (response == emailAlreadyExist)
    return res.send('email ja existe')
  if (!response)
    return res.status(400).send('ocorreu um erro')
  if (response)
    return res.send(response)
}

const deleteAll = async (req, res) => {
  const response = await Collaborator.deleteMany({})
  res.send(response)
}

const deleteOne = async (req, res) => {
  const { email, passowrd } = req.body
  const collaborator = await collaboratorQuery.findOneWithPassowrd(email)
  const isValid = collaborator && verifyPassowrd(passowrd, collaborator.passowrd)
  if (isValid) {
    await collaboratorQuery.deleteOne(email)
    res.send('removido com sucesso')
  } else {
    return res.status(400).send('ocorreu um erro')
  }
}

export default { getAll, save, update, deleteAll, deleteOne, getOne }