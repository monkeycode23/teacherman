import mongoose from "mongoose";


const  sessionActivitySchema = new mongoose.Schema(
  {
    
    type: {
      type: String,
      enum: ["attendance", "reading", "exercises", "oral_lesson", "custom"],
      default: "exercises",
    },
    description:String,
    title: String,
    completed: Boolean,
    order: Number,
    progress:{
        type:Number,
        default:0
    }
  },
  { timestamps: true }
);

export default mongoose.model("SessionActivity", sessionActivitySchema);
