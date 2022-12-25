import Collaborator from "../model/collaborator.js"

const getAll = async (req, res) => {
  const response = await Collaborator.find({})
  res.send(response)
}

export default { getAll }