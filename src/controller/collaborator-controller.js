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

export default { getAll, save }