import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  taskList: { type: mongoose.Schema.Types.ObjectId, ref: "TaskList" },
  task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  area: { type: mongoose.Schema.Types.ObjectId, ref: "Area" },

  title: { type: String, required: true },
  description: String,

  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "media"
  },

  reminder:{
    
  },

  subTasks:[{
     type: mongoose.Schema.Types.ObjectId, ref: "Task" ,
  }],

  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // responsable
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  status: {
    type: String,
    enum: ["pending", "inprogress", "block", "completed"],
    default: "pending"
  },

  //progress: { type: Number, min: 0, max: 100, default: 0 },

  deadline: Date
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
