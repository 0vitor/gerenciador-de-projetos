import Collaborator from "../model/collaborator.js"
import verifyPassowrd from "../infra/cryptography/verify-passowrd.js"
import encrypt from "../infra/cryptography/encrypt.js"
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
  req.body.passowrd = encrypt(req.body.passowrd, 10);
  console.log(req.body.passowrd)
  const result = await collaboratorQuery.create(req.body)
  const emailAlreadyExist = 11000
  if (result == emailAlreadyExist) {
    res.status(400).send('email ja existe')
  } else if (!result) {
    res.status(400).send('ocorreu um erro')
  } else {
    res.send('registrado com sucesso')
  }
}

const update = async (req, res) => {
  try {

    const { currentEmail, newEmail, name, passowrd, funcao } = req.body
    const collaborator = await collaboratorQuery.findOne(currentEmail)
    if (!collaborator) {
      return res.send('usuario nao encontrado')
    }
    const collaboratorData = { email: newEmail, name, passowrd: encrypt(passowrd, 10), funcao }
    const isValid = await verifyPassowrd(passowrd, collaborator.passowrd)
    if (isValid) {
      const response = await collaboratorQuery.updateOne(currentEmail, collaboratorData)
      const emailAlreadyExist = 11000
      if (response == emailAlreadyExist)
        res.status(400).send('email ja existe')
      else
        res.send(response)
    } else {
      res.status(400).send('senha incorreta')
    }
  }catch (err) {
    res.status(400).send('ocorreu um erro, verifique se os parametros estão corretos')
  }

}

const deleteAll = async (req, res) => {
  console.log('asdsa')
  const response = await Collaborator.deleteMany({})
  res.send(response)
}

const deleteOne = async (req, res) => {
  const { email, passowrd } = req.body
  const collaborator = await Collaborator.findOne({ email }).select('+passowrd')
  if (verifyPassowrd(passowrd, collaborator.passowrd)) {
    await Collaborator.deleteOne({ email: email, passowrd: collaborator.passowrd })
    res.send('deletado com sucesso')
  } else {
    return res.status(400).send('senha incorreta')
  }
}

export default { getAll, save, update, deleteAll, deleteOne, getOne }