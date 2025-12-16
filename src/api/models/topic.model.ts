import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({

    title: { 
    type: String, 
    required: true, 
    trim: true,
  },
   
  description: String,

  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }
  ],
  events: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Event" }
  ],
quizzes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }
  ],


  classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom", required: true },
 
  resources:[
    { type: mongoose.Schema.Types.ObjectId, ref: "Resource" }
  ],


   progress: { type: Number, min: 0, max: 100, default: 0 },

  
}, { timestamps: true });

/* taksListSchema.set("toJSON", { virtuals: true });
taksListSchema.set("toObject", { virtuals: true });

 taksListSchema.virtual("stats").get(function () {


  return {totalTasks: 0};
}); */

export default mongoose.model("Topic", topicSchema);
                