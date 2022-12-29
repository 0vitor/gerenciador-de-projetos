import Project from "../model/project.js"
//import verifyPassowrd from "../infra/cryptography/verify-passowrd.js"
//import encrypt from "../infra/cryptography/encrypt.js"
import projectQuery from "../infra/mongodb/project-query.js"

const getAll = async (req, res) => {
  const response = await Project.find({})
  res.send(response)
}

const getOne = async (req, res) => {
  const { name } = req.body
  const response = await Project.findOne({ name }).populate({path: 'collaborators'}).exec()
  res.send(response)
}

const save = async (req, res) => {
  const result = await projectQuery.create(req.body)
  const nameAlreadyExist = 11000
  if (result == nameAlreadyExist) {
    res.status(400).send('name ja existe')
  } else if (!result) {
    res.status(400).send('ocorreu um erro')
  } else {
    res.send('projeto criado com sucesso')
  }
}
//
//const update = async (req, res) => {
//  try {
//
//    const { currentEmail, newEmail, name, passowrd, funcao } = req.body
//    const collaborator = await projectQuery.findOne(currentEmail)
//    if (!collaborator) {
//      return res.send('usuario nao encontrado')
//    }
//    const collaboratorData = { email: newEmail, name, passowrd: encrypt(passowrd, 10), funcao }
//    const isValid = await verifyPassowrd(passowrd, collaborator.passowrd)
//    if (isValid) {
//      const response = await projectQuery.updateOne(currentEmail, collaboratorData)
//      const emailAlreadyExist = 11000
//      if (response == emailAlreadyExist)
//        res.status(400).send('email ja existe')
//      else
//        res.send(response)
//    } else {
//      res.status(400).send('senha incorreta')
//    }
//  }catch (err) {
//    res.status(400).send('ocorreu um erro, verifique se os parametros estão corretos')
//  }
//
//}
//
//const deleteAll = async (req, res) => {
//  console.log('asdsa')
//  const response = await Project.deleteMany({})
//  res.send(response)
//}
//
//const deleteOne = async (req, res) => {
//  const { email, passowrd } = req.body
//  const project = await Project.findOne({ email }).select('+passowrd')
//  if (verifyPassowrd(passowrd, collaborator.passowrd)) {
//    await Collaborator.deleteOne({ email: email, passowrd: collaborator.passowrd })
//    res.send('deletado com sucesso')
//  } else {
//    return res.status(400).send('senha incorreta')
//  }
//}
//
export default { getAll, getOne, save }