import mongoose from "mongoose";
const Schema = mongoose.Schema
const companySchema = new Schema({
  name: {type: String, required: true, unique: true, trim: true},
  address: {type: String, required: true},
  cnpj: {type: Number, required: true },
  phoneNumber: {type: Number, required: true},
})

const Company = mongoose.model('company', companySchema)

export default Company