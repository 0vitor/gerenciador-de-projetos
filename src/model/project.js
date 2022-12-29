import mongoose from "mongoose";
const Schema = mongoose.Schema
const projectSchema = new Schema({
  name: {type: String, required: true, unique: true, trim: true},
  description: {type: String, required: true},
  status: {type: String, required: true },
  value: {type: Number, required: true},
  collaborators: [{type: Schema.Types.ObjectId, ref: 'collaborator'}],
  companies: [{type: Schema.Types.ObjectId, ref: 'company'}]
})

const Project = mongoose.model('project', projectSchema)

export default Project