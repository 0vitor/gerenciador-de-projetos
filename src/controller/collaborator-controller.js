import Collaborator from "../model/collaborator.js"
import encrypt from "../infra/cryptography/encrypt.js"
import yup from "yup"
import errorHandler from "../error/error-handle.js"

const schemaCollaborator = yup.object().shape({
  name: yup.string().required('Erro: Necessário preencher o campo nome!'),
  email: yup.string()
    .email('Erro: Email com formato inválido')
    .required('Erro: Necessário preencher o campo email!'),
  passowrd: yup.string()
    .min(8, 'Erro: Necessário ter no mínimo 8 caracteres!')
    .required('Erro: Necessário ter no mínimo 8 caracteres!'),
  role: yup.string().required('Erro: Necessário preencher o campo função!')
})

const getAll = async (req, res) => {
  const response = await Collaborator.find({})
  res.send(response)
}

const getEmail = async (req, res) => {
  try {
    const { email } = req.query
    const response = await Collaborator.findOne({ email })
    if (response)
      res.send(response)
    else
      res.status(404).send('not found')
  } catch (err) {
    console.log(err)
    res.status(400).send('error')
  }
}

const save = async (req, res) => {
  try {
    const collaborator = req.body
    await schemaCollaborator.validate(collaborator)
    collaborator.passowrd = encrypt(collaborator.passowrd);
    await Collaborator.create(collaborator)
    return res.status(201).send('criado com sucesso!')
  } catch (err) {
    errorHandler(res, err, 'email')
  }
}

const update = async (req, res) => {
  try {
    const collaborator = req.body
    const { email } = req.query
    await schemaCollaborator.validate(collaborator)
    collaborator.passowrd = encrypt(collaborator.passowrd)
    const result = await Collaborator.updateOne({ email }, collaborator)
    if (result.modifiedCount)
      return res.send('modificado com sucesso!')
    else
      return res.status(400).send('ocorreu um erro')

  } catch (err) {
    errorHandler(res, err, 'email')
  }
}

const deleteAll = async (req, res) => {
  const response = await Collaborator.deleteMany({})
  res.send(response)
}

const deleteByEmail = async (req, res) => {
  try {
    const { email } = req.body
    await Collaborator.deleteOne({ email })
    res.send('removido com sucesso')
  } catch (err) {
    console.log(err)
    return res.status(400).send('ocorreu um erro')
  }
}

export default { getAll, getEmail, save, update, deleteAll, deleteByEmail }