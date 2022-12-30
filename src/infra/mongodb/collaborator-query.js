import Collaborator from "../../model/collaborator.js"
import encrypt from "../cryptography/encrypt.js"

const findOneWithPassowrd = async (email) => {
  const result = await Collaborator.findOne({ email }).select('+passowrd')
  return result
}

const findOne = async (email) => {
  const result = await Collaborator.findOne({ email })
  return result
}

const updateOne = async (collaborator) => {
  try {
    collaborator.email = collaborator.newEmail
    collaborator.passowrd = encrypt(collaborator.passowrd)
    const email = collaborator.email
    const res = await Collaborator.updateOne({ email }, collaborator)
    if (res.acknowledged) {
      return 'modificado com sucesso!'
    } else {
      return false
    }
  } catch (err) {
    return err.code
  }
}

const create = async (collaborator) => {
  try {
    collaborator.passowrd = encrypt(collaborator.passowrd);
    await Collaborator.create(collaborator)
    return true
  } catch (err) {
    return err.code
  }
}

const deleteOne = async (email) => {
  await Collaborator.deleteOne({ email })
}

export default { findOne, findOneWithPassowrd, updateOne, create, deleteOne }