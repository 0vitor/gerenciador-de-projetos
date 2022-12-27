import Collaborator from "../model/collaborator.js"
import verifyPassowrd from "../infra/cryptography/verify-passowrd.js"
import encrypt from "../infra/cryptography/encrypt.js"

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
  const hash = encrypt(req.body.passowrd, 10);
  req.body.passowrd = hash
  await Collaborator.create(req.body, (err, data) => {
    err ? res.send(err) : res.send('salvo com sucesso')
  }
  )
}

const update = async (req, res) => {
  const { currentEmail, newEmail, name, passowrd, funcao } = req.body
  const query = { email: currentEmail }
  const collaboratorData = { name, email: newEmail, passowrd, funcao }
  const collaborator = await Collaborator.findOne({ currentEmail }).select('+passowrd')
  
  if (await verifyPassowrd(passowrd, collaborator.passowrd)) {
    Collaborator.updateOne(query, collaboratorData,
      (err, data) => {
        if (err) {
          res.send('server error')
        }
        if (data.matchedCount == 0) {
          res.send('usuario ou senha incorreto')
        }
        if (data.modifiedCount != 0) {
          res.send('atualizado com sucesso')
        }
      }
    )
  } else {
    res.send('usuario ou senha incorreto')
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