import mongoose from "mongoose";

const Schema = mongoose.Schema

const projectSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  status: {type: String, required: true },
  value: {type: String, required: true},
  calloborators: {type: [Schema.ObjectId]},
  companies: {type: [Schema.ObjectId]}
})

const Project = mongoose.model('project', projectSchema)

export default Project