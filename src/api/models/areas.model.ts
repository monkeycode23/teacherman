import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

  name: { type: String, required: true },
  description: String,

  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // encargado del área

  collaborators: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  tasksList:[
    { type: mongoose.Schema.Types.ObjectId, ref: "TaskList" }
  ]
}, { timestamps: true });

export default mongoose.model("Area", areaSchema);