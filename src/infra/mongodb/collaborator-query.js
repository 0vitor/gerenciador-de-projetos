import Collaborator from "../../model/collaborator.js"

const findOne = async (email) => {
  const result = await Collaborator.findOne({ email }).select('+passowrd')
  return result
}

const updateOne = async (email, updateData) => {
  try {
    const res = await Collaborator.updateOne({ email }, updateData)
    if (res.acknowledged) {
      return 'modificado com sucesso!'
    } else
      return false
  } catch (err) {
    return err.code
  }
}

const create = async (collaborator) => {
  try {
    await Collaborator.create(collaborator)
    return true
  } catch (err) {
    return err.code
  }
}

export default { findOne, updateOne, create }