import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,

  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  styles:{
    type:Object,
    default:{
      color:"#000000",
      backgroundColor:"#ffffff",  
    }
  },
  repositories:[
     {
      label: String,
    url: String,
  }
  ],

  taskLists: [
    { type: mongoose.Schema.Types.ObjectId, ref: "TaskLists" }
  ],

  collaborators: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],

  areas: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Area" }
  ],

  tags:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Tag" }
  ],

  clients:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Client" }
  ],

  status:{
    type:String,
    default:"pending",
    enum:["pending","inprogress","completed","canceled","paused"]
  },

  categories:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Category" }
  ],


  progress: { type: Number, min: 0, max: 100, default: 0 },

  startDate: Date,
  endDate: Date
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
