import mongoose from "mongoose";

const Schema = mongoose.Schema

const CollaboratorsSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  passowrd: {type: String, required: true, select: false},
  role: {type: String, required: true}
})

const Collaborator = mongoose.model("collaborator", CollaboratorsSchema)

export default Collaborator