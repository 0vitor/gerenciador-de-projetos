import Company from "../model/company.js"
import yup from "yup"
import errorHandler from "../error/error-handle.js";

const phoneRegExp = /\+\d{2}\s?\(\d{2}\)\s?\d{4,5}-?\d{4}/g;
const cnpjRegExp = /\d{2}(\.\d{3}){2}\/\d{4}\-\d{2}/g

const schemaCompany = yup.object().shape({
  newName: yup.string(),
  name: yup.string()
    .required('Erro: Necessário preencher o campo status!'),
  address: yup.string().required(),
  cnpj: yup.string()
    .matches(cnpjRegExp, 'Erro: Formato inválido!')
    .required('Erro: Necessário preencher o campo cnpj!'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Formato inválido')
    .required('Erro: Necessário preencher o campo telefone!'),
})

const getAll = async (req, res) => {
  const response = await Company.find({})
  res.send(response)
}

const getOne = async (req, res) => {
  try {
    const { email } = req.body
    const response = await Company.findOne({ email })
    res.send(response)
  } catch (err) {
    return res.status(400).send('ocorreu um erro')
  }
}

const save = async (req, res) => {
  try {
    const empresa = req.body
    await schemaCompany.validate(empresa)
    await Company.create(empresa)
    return res.status(201).send('empresa criado com sucesso')
  } catch (err) {
    errorHandler(res, err, 'empresa')
  }
}


const update = async (req, res) => {
  try {
    const company = req.body
    const { name } = company
    await schemaCompany.validate(company)
    if (company.newName)
      company.name = company.newName
    const result = await Company.updateOne({ name }, company)
    if (result.modifiedCount)
      return res.send('modificado com sucesso!')
    else
      return res.send('não ouve modificações!')
  } catch (err) {
    errorHandler(err, 'empresa')
  }
}

const deleteAll = async (req, res) => {
  const response = await Company.deleteMany({})
  res.send(response)
}


const deleteOne = async (req, res) => {
  try {
    const { name } = req.body
    await Company.deleteOne(name)
    res.send('deletado com sucesso')
  } catch (err) {
    return res.status(400).send('senha incorreta')
  }
}

export default { getAll, getOne, save, update, deleteAll, deleteOne }