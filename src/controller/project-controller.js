import Project from "../model/project.js"
import yup from "yup"

const schemaProject = yup.object().shape({
  newName: yup.string(),
  name: yup.string().required(),
  description: yup.string().required(),
  status: yup.string().oneOf(
    ["prospectado", "producao", "finalizado"]
  )
    .required(),
  value: yup.number()
    .positive()
    .required(),
  collaborators: yup.array().of(yup.string().length(24).required())
    .required(),
  companies: yup.array().required()
})

const getAll = async (req, res) => {
  const response = await Project.find({})
    .populate({ path: 'collaborators' })
    .populate({ path: 'companies' })
    .exec()
  res.send(response)
}

const getOne = async (req, res) => {
  const { name } = req.query
  const response = await Project.findOne({ name })
    .populate({ path: 'collaborators' })
    .populate({ path: 'companies' })
    .exec()
  if(response)
    res.send(response)
  else
    res.status(404).send("Not found")
}

const save = async (req, res) => {
  try {
    const project = req.body
    await schemaProject.validate(project)
    await Project.create(project)
    return res.status(201).send('projeto criado com sucesso')
  } catch (err) {
    return res.status(400).send(err.message)
  }
}

const deleteAll = async (req, res) => {
  const response = await Project.deleteMany({})
  res.send(response)
}

const update = async (req, res) => {
  try {
    const project = req.body
    const { name } = project
    await schemaProject.validate(project)
    if (project.newName)
      project.name = project.newName
    await Project.updateOne({ name }, project)
    return res.send('modificado com sucesso!')
  } catch (err) {
    res.status(400).send(err.message)
  }
}

const deleteOne = async (req, res) => {
  try {
    const { name } = req.body
    await Collaborator.deleteOne({ name })
    res.send('deletado com sucesso')
  } catch (err) {
    return res.status(400).send(err.message)
  }
}

export default { getAll, getOne, save, deleteAll, update, deleteOne }