import mongoose from "mongoose";

const taksListSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    
    trim: true,
    lowercase: true // para unificar "Urgente" y "urgente"
  },
  description: String,

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },

  tags:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
  ],

  tasks:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Task" }
  ],

  deadLine: Date,
  
  leader: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // encargado de la lista de tareas
  collaborators: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

   progress: { type: Number, min: 0, max: 100, default: 0 },

  
}, { timestamps: true });

taksListSchema.set("toJSON", { virtuals: true });
taksListSchema.set("toObject", { virtuals: true });

 taksListSchema.virtual("statics").get(function () {

  const total = this.tasks?.length
  return {totalTasks:total || 0};
});

export default mongoose.model("TaskLists", taksListSchema);
                