import Collaborator from "../model/collaborator.js"

const getAll = async (req, res) => {
  const response = await Collaborator.find({})
  res.send(response)
}

const save = async (req, res) => {
  await Collaborator.create(req.body, (err, data) => {
    err ? res.send(err) : res.send(data)
  }
  )
}

const update = async (req, res) => {
  const { currentEmail, newEmail, name, passowrd, funcao } = req.body
  const query = { email: currentEmail }
  const collaboratorData = { name, email: newEmail, passowrd, funcao }

  Collaborator.updateOne(
    query,
    collaboratorData,
    (err, data) => err ? res.send(err) : res.send(data)
  )
}

const deleteAll = async (req, res) => {
  const response = await Collaborator.deleteMany({})
  res.send(response)
}

const deleteOne = async (req, res) => {
  const { email, passowrd } = req.body
  const response = await Collaborator.deleteOne({ email, passowrd })
  res.send(response)
}

export default { getAll, save, update, deleteAll, deleteOne }