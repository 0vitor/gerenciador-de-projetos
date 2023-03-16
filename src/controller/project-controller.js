import Project from "../model/project.js"
import yup from "yup"
import errorHandler from "../error/error-handle.js"

const schemaProject = yup.object().shape({
  newName: yup.string(),
  name: yup.string().required(),
  description: yup.string().required('Erro: Necessário preencher o campo nome!'),
  status: yup.string().oneOf(
    ["prospectado", "producao", "finalizado"]
  )
    .required('Erro: Necessário preencher o campo status!'),
  value: yup.number('Erro: Este campo deve possuir apenas números')
    .positive('Erro: Este campo só aceita números positivos!')
    .required('Erro: Necessário preencher o campo valor!'),
  collaborators: yup.array()
    .required('Erro: Necessário preencher o campo calaboradores!'),
  companies: yup.array().required('Erro: Necessário preencher o campo empresas!')
})

const getAll = async (req, res) => {
  const response = await Project.find({})
    .populate({ path: 'collaborators' })
    .populate({ path: 'companies' })
    .exec()
  res.send(response)
}

const getOne = async (req, res) => {
  const { name } = req.body
  const response = await Project.findOne({ name })
    .populate({ path: 'collaborators' })
    .populate({ path: 'companies' })
    .exec()

  res.send(response)
}

const save = async (req, res) => {
  try {
    const project = req.body
    await schemaProject.validate(project)
    await Project.create(project)
    return res.status(201).send('projeto criado com sucesso')
  } catch (err) {
    errorHandler(err, 'project')
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
    errorHandler(err, 'projeto')
  }
}


const deleteOne = async (req, res) => {
  try {
    const { name } = req.body
    await Collaborator.deleteOne({ name })
    res.send('deletado com sucesso')
  } catch (err) {
    //console.log(err)
    return res.status(400).send('ocorreu um erro')
  }
}

export default { getAll, getOne, save, deleteAll, update, deleteOne }