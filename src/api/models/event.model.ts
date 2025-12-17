import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },
     color: {
      type: String,
      
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    type: {
      type: String,
      enum: ["class", "exam", "assignment", "meeting","session", "other"],
      default: "class",
      required:true
    },

    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
      index: true,
    },

    topic: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     progress: { type: Number, min: 0, max: 100, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const eventModel = mongoose.model("Event", eventSchema);
