import mongoose from "mongoose";
const Schema = mongoose.Schema
const companySchema = new Schema({
  name: {type: String, required: true, unique: true, trim: true},
  address: {type: String, required: true},
  cnpj: {type: String, required: true },
  phoneNumber: {type: String, required: true},
})

const Company = mongoose.model('company', companySchema)

export default Company