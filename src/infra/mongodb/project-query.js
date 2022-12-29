import Project from "../../model/project.js"


const create = async (project) => {
  try {
    console.log(project)
    await Project.create(project)
    return 'usuario criado com sucesso'
  } catch (err) {
    //console.log(err)
    return err.code
  }
}

export default { create }