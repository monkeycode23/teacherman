import mongoose from "mongoose";

const classSessionSchema = new mongoose.Schema(
  {
    sessionDate: {
      type: Date,
      default: Date.now(),
    },

    classroom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom",
      required: true,
    },

    assists: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        status: {
          type: String,
          enum: ["assisted", "absent", ""],
          default: "pending",
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("ClassSession", classSessionSchema);
