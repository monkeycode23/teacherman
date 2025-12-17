import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: String,
    color: { type: String, default: "#666666" },
    icon: { type: String, default: "📁" },
    studentsState: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
          index: true,
        },
        status: {
          type: String,
          enum: ["pending", "handed", "calificated"],
        },
      },
    ],
    dateLimit: {
      type: Date,
      default: Date.now(),
    },
    calification: {
      type:{
        type:String,
      },
      score:Number
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", assignmentSchema);
